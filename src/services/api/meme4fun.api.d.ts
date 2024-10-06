export interface epochsData {
  epoch: string;
  period_quantity: number;
  total_weekly_release: number;
  total_daily_release: number;
}

export interface TradeRewardData {
  revenues_of_day: number;
  create_fee: number;
  trade_fee: number;
  trade_fee_boost: number;
  available_fun: number;
  locking_fun: number;
  epochs: epochsData[];
}

export interface LpRewardData {
  pool_address: string;
  fun_address: string;
  total_reward: number;
  pool_info_list: {
    pool_id: number;
    total_pool_tokens: number;
    pooled_sol: number;
    pooled_fun: number;
    pool_status: 'STAKED' | 'UN_STAKE';
  }[];
}

export interface TickersData {
  id: number;
  name: string;
  ticker: string;
  desc: string;
  price_24h_change: number;
  market_cap_sol: number;
  trade_count: number;
  comment_count: number;
  mint_account: string;
  img_url: string;
  img_height: string;
  img_weight: string;
  liquid: number;
}

export interface TickerCommentData {
  mint_account: string;
  file_uri: string;
  text: string;
  user_account: string;
  user_name: string;
  user_avatar: string;
  comment_ts: number;
  total_likes: number;
}

export interface AirdropPieChartData {
  total_users: number;
  total_revenues: number;
  total_staked_fun: number;
  estimated_apr_percentage: number;
  pie_info: {
    label_name: string;
    value: number;
  }[];
}

export interface RadarChartData {
  airdrop_expected_value: number;
  held_ticket_count: number;
  created_ticket_count: number;
  win_rate: number;
  launch_rate: number;
}

export interface TopTipsData {
  name: string;
  ticker: string;
  image_uri: string;
  price_24h_change: number;
}

export interface AirdropData {
  create_coins_amount: number;
  trade_amount: number;
  user_address: string;
  airdrop_amount: number;
}

export type TaskType = 'TASK_TYPE_INVITE' | 'TASK_TYPE_CREATE_ONE_MEME';

export interface StakingData {
  available_to_claim: number;
  claimed_amount: number;
  staked_apr: number;
  stake_available_amount: number;
  un_stake_available_amount: number;
  available_fun_to_claim: number;
  available_wsol_to_claim: number;
}

export interface TikersParams {
  name?: string;
  ticker?: string;
  mint_account?: string;
  listed_on_dex?: boolean;
  id?: string;
  fun_tickers_sort?: 'SortByNewest' | 'SortBy5MinRising' | 'SortByVolume';
  cursor?: number;
}
