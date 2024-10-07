from datetime import datetime, tzinfo, timedelta


class UTC(tzinfo):
    """UTC"""

    def __init__(self, offset=0):
        self._offset = offset

    def utcoffset(self, dt):
        return timedelta(hours=self._offset)

    def tzname(self, dt):
        return "UTC +%s" % self._offset

    def dst(self, dt):
        return timedelta(hours=self._offset)


def gen_start_ts_day(tz=UTC(8), rg=None) -> list:
    rg = rg or range(0, 30)
    start_ts = list()
    today = datetime.now(tz=tz)
    for offset in rg:
        day = today - timedelta(offset)
        start = datetime(day.year, day.month, day.day, tzinfo=tz)
        s_ts = int(start.timestamp())
        #         print('Beijing:', start, s_ts)
        start_ts.append(s_ts)

    return start_ts


def belong_to_month(timestamp):
    dt = datetime.fromtimestamp(timestamp)
    return datetime(dt.year, dt.month, 1).date()


def ts_to_date(timestamp, tz=None):
    # tz=UTC(0)
    return datetime.fromtimestamp(timestamp, tz)


def ms_to_date(timestamp_ms, tz=None):
    # default tz=UTC(0)
    # convert unix timestamp in millisecond to datetime object
    return datetime.fromtimestamp(timestamp_ms / 1000, tz)


if __name__ == '__main__':
    today = datetime.now()
    cur_ts = today.timestamp()
    print('cur_ts=', int(cur_ts))

    print(belong_to_month(cur_ts))
    print(ts_to_date(cur_ts))

    ts_list = gen_start_ts_day()
