import re
import struct
import base58
from solders.pubkey import Pubkey

METAPLEX_PROGRAM_ID = Pubkey.from_string("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")


def find_metaplx_account_by_mint(mint_account):
    mint_account = Pubkey.from_string(mint_account)

    seeds = [b"metadata", bytes(METAPLEX_PROGRAM_ID), bytes(mint_account)]
    address, _ = Pubkey.find_program_address(
        seeds=seeds,
        program_id=METAPLEX_PROGRAM_ID,
    )
    return address


def find_pda_account():
    key, _ = Pubkey.find_program_address(
        seeds=[bytes(owner), bytes(TOKEN_PROGRAM_ID), bytes(mint)],
        program_id=ASSOCIATED_TOKEN_PROGRAM_ID,
    )
    return key


def unpack_metadata_account(data):
    assert (data[0] == 4)
    i = 1
    source_account = base58.b58encode(bytes(struct.unpack('<' + "B" * 32, data[i:i + 32])))
    i += 32
    mint_account = base58.b58encode(bytes(struct.unpack('<' + "B" * 32, data[i:i + 32])))
    i += 32
    name_len = struct.unpack('<I', data[i:i + 4])[0]
    i += 4
    name = struct.unpack('<' + "B" * name_len, data[i:i + name_len])
    i += name_len
    symbol_len = struct.unpack('<I', data[i:i + 4])[0]
    i += 4
    symbol = struct.unpack('<' + "B" * symbol_len, data[i:i + symbol_len])
    i += symbol_len
    uri_len = struct.unpack('<I', data[i:i + 4])[0]
    i += 4
    uri = struct.unpack('<' + "B" * uri_len, data[i:i + uri_len])
    i += uri_len
    fee = struct.unpack('<h', data[i:i + 2])[0]
    i += 2
    has_creator = data[i]
    i += 1
    creators = []
    verified = []
    share = []
    if has_creator:
        creator_len = struct.unpack('<I', data[i:i + 4])[0]
        i += 4
        for _ in range(creator_len):
            creator = base58.b58encode(bytes(struct.unpack('<' + "B" * 32, data[i:i + 32])))
            creators.append(creator)
            i += 32
            verified.append(data[i])
            i += 1
            share.append(data[i])
            i += 1
    primary_sale_happened = bool(data[i])
    i += 1
    is_mutable = bool(data[i])
    metadata = {
        "update_authority": source_account,
        "mint": mint_account,
        "data": {
            "name": bytes(name).decode("utf-8").strip("\x00"),
            "symbol": bytes(symbol).decode("utf-8").strip("\x00"),
            "uri": bytes(uri).decode("utf-8").strip("\x00"),
            "seller_fee_basis_points": fee,
            "creators": creators,
            "verified": verified,
            "share": share,
        },
        "primary_sale_happened": primary_sale_happened,
        "is_mutable": is_mutable,
    }
    return metadata


def parse_solana_logs(log_messages):
    stack = []

    for line in log_messages:
        invoke_match = re.match(r'Program (.+?) invoke \[(\d+)\]', line)
        success_match = re.match(r'Program (.+?) success', line)
        log_match = re.match(r'Program log: (.+)', line)
        data_match = re.match(r'Program data: (.+)', line)
        consumed_match = re.match(r'Program (.+?) consumed (\d+) of (\d+) compute units', line)

        if invoke_match:
            program_id = invoke_match.group(1)
            cur_level = int(invoke_match.group(2))
            if cur_level == 1:
                stack.append({'level': cur_level, 'program_id': program_id, 'logs': [], 'data': None, 'consumed': None})

        elif success_match:
            if stack:
                stack[-1]['logs'].append({'type': 'success', 'program_id': success_match.group(1)})

        elif log_match:
            if stack:
                stack[-1]['logs'].append({'type': 'log', 'message': log_match.group(1)})

        elif data_match:
            if stack:
                stack[-1]['data'] = data_match.group(1)

        elif consumed_match:
            if stack:
                program_id = consumed_match.group(1)
                consumed_units = int(consumed_match.group(2))
                total_units = int(consumed_match.group(3))
                stack[-1]['consumed'] = {'program_id': program_id, 'consumed': consumed_units, 'total': total_units}

    return stack
