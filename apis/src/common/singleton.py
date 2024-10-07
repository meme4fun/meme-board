
class SingletonArgs(type):
    _instances = {}
    _init = {}

    def __call__(cls, *args, **kwargs):
        key = (cls, str((args, kwargs)))
        if key not in cls._instances:
            cls._instances[key] = super(SingletonArgs, cls).__call__(*args, **kwargs)
        return cls._instances[key]


Singleton = SingletonArgs


def test():
    class Logger(metaclass=Singleton):
        def __init__(self):
            print(f"__init__")

    logger1 = Logger()
    logger2 = Logger()
    assert (logger1 == logger2)


def test_args():
    class Logger(metaclass=SingletonArgs):
        def __init__(self, name):
            print(f"__init__ name={name}")

    logger_a1 = Logger("logA")
    logger_a2 = Logger("logA")

    logger_b1 = Logger("logB")
    logger_b2 = Logger("logB")

    assert (logger_a1 == logger_a2)
    assert (logger_b1 == logger_b2)
    assert (logger_a1 != logger_b1)


if __name__ == '__main__':
    test()
    test_args()
