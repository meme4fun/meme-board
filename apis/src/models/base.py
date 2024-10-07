import datetime

from pydantic import ConfigDict, BaseModel, BaseConfig


def convert_datetime_to_str(dt: datetime.datetime) -> str:
    return dt.replace(tzinfo=datetime.timezone.utc).isoformat().replace("+00:00", "Z")


class FunModel(BaseModel):
    model_config = ConfigDict()

    # populate_by_name = True
    # json_encoders = {datetime.datetime: convert_datetime_to_str}
