
import asyncio
import signal
import logging


class GracefulKiller:
    kill_now = False
    def __init__(self, ioloop, server=None):
        self.server = server
        self.ioloop = ioloop
        signal.signal(signal.SIGINT, self.exit_gracefully)
        signal.signal(signal.SIGTERM, self.exit_gracefully)

    def exit_gracefully(self, signum, frame):
        logging.warn('exit_gracefully')
        print('exit_gracefully', signum)

        self.kill_now = True
        if self.server:
            print('server stop')
            self.server.stop()

        self.ioloop.IOLoop.instance().stop()


class SchedulerKiller(object):
    kill_now = False

    def __init__(self):
        signal.signal(signal.SIGINT, self.exit_gracefully)
        signal.signal(signal.SIGTERM, self.exit_gracefully)

    def exit_gracefully(self, signum, frame):
        self.kill_now = True


async def wait_for_jobs(scheduler):
    scheduler.pause()
    executor = scheduler._executors["default"]
    while True:
        jobs = scheduler.get_jobs()
        running_ins_num = 0
        for job in jobs:
            if executor._instances[job.id] != 0:
                running_ins_num += 1
        logging.info(f"running_ins_num: {running_ins_num}")
        if running_ins_num:
            await asyncio.sleep(1)
        else:
            break
