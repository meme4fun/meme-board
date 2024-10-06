import AxiosRequest from '@/services/api/index';
import {
  TradeRewardData,
  LpRewardData,
  TickersData,
  TickerCommentData,
  AirdropPieChartData,
  RadarChartData,
  TopTipsData,
  AirdropData,
  TaskType,
} from './meme4fun.api.d';
import { StakingData, TikersParams } from '@/services/api/meme4fun.api';

export * from './meme4fun.api.d';

const baseURL = 'http://127.0.0.1:4523/m1/5216802-4883257-default';
/**
 * --------Auth---------
 */

// 获取登陆签名 Challenge
export const postLoginSign = async (
  address: string,
): Promise<{
  inviter: string;
  message: string;
  signature: string;
}> => {
  return AxiosRequest.post(`/api/public/auth/challenge`, {
    address,
  });
};

// 签名注册登陆
export const postLogin = async (
  inviter: string,
  message: string,
  signature: string,
) => {
  return AxiosRequest.post(`/api/public/auth/login`, {
    inviter,
    message,
    signature,
  });
};

// 注销登陆
export const postLogout = async () => {
  return AxiosRequest.post(`/api/public/auth/logout`, {});
};

// 绑定邀请关系
export const postBindInvite = async (inviter?: string) => {
  return AxiosRequest.post(`/api/public/auth/rebind`, { inviter });
};

/**
 * --------User---------
 */

// 用户信息
export const postUserMetadata = async (): Promise<{
  inviter_address: string;
  bound_invite_code: string;
  invite_code: string;
}> => {
  return AxiosRequest.post(`/api/private/user/metadata`, {});
};

/**
 * --------meme4fun---------
 */

// 发表评论
export const postComment = async (id: string, text: string) => {
  return AxiosRequest.post(`/api/private/fun/ticker/comment`, {
    id,
    text,
  });
};

// AirDrop 雷达图数据
export const getAirdropRadarChart = async (): Promise<RadarChartData> => {
  return AxiosRequest.get(`/api/private/fun/radar_chart/airdrop`, { baseURL });
};

// 拥有的 Tick 列表
export const getHoldTickerList = async (): Promise<any[]> => {
  return AxiosRequest.get(`/api/private/fun/ticker/owned`, { baseURL });
};

// 已创建 Ticker 列表
export const getCreatedTickerList = async (): Promise<any[]> => {
  return AxiosRequest.get(`/api/private/fun/ticker/created`, {});
};

// 任务验证
export const postVerifyTask = async (
  action_type: TaskType,
): Promise<{ verified: boolean; fun: number }> => {
  return AxiosRequest.post(
    `/api/private/fun/task/verify`,
    { action_type },
    { baseURL },
  );
};

// 交易奖励面板
export const getTradeRewardInfo = async (): Promise<TradeRewardData> => {
  return AxiosRequest.get(`/api/private/fun/trade_reward`, { baseURL });
};

// lp 奖励信息
export const getLpRewardInfo = async (): Promise<LpRewardData> => {
  return AxiosRequest.get(`/api/private/fun/lp_info`, { baseURL });
};

// 顶部 tips
export const getTopTips = async (): Promise<TopTipsData[]> => {
  return AxiosRequest.get(`/api/public/fun/tips`, { baseURL });
};

// Banners
export const getBanners = async (): Promise<
  {
    title: string;
    desc: string;
    link: string;
    url: string;
    sort_idx: number;
    is_third_party: boolean;
  }[]
> => {
  return AxiosRequest.get(`/api/public/fun/banners`, { baseURL });
};

// Tickers
export const getTickers = async (
  params: TikersParams,
): Promise<{
  list: TickersData[];
  next_cursor: number;
}> => {
  return AxiosRequest.get(`/api/public/fun/tickers`, { params, baseURL });
};

// History Orders
export const getHistoryOrders = async (): Promise<
  {
    mint_account: string;
    side: string;
    sol_amount: number;
    token_amount: number;
    trade_ts: number;
    signature: string;
  }[]
> => {
  return AxiosRequest.get(`/api/public/fun/history/orders`, {});
};

// 指定 Tick 的评论列表
export const getTickerComments = async (
  id: string,
): Promise<{
  list: TickerCommentData[];
  next_cursor: number;
}> => {
  return AxiosRequest.get(`/api/public/fun/ticker/comment`, {
    params: { id },
    baseURL,
  });
};

// 指定 Ticker 的 Top Holders
export const getTopHolders = async (params: {
  mint_account: string;
}): Promise<
  { user_avatar: string; user_address: string; percentage: number }[]
> => {
  return AxiosRequest.get(`/api/public/fun/ticker/top_holders`, { params });
};

// 空投饼状图统计信息
export const getAirdropPieChart = async (): Promise<AirdropPieChartData> => {
  return AxiosRequest.get(`/api/public/fun/airdrop/pie_chart`, { baseURL });
};

// $Fun 代币信息
export const getFunTokensInfo = async (): Promise<{
  liquidity: number;
  market_cap: number;
  price: number;
}> => {
  return AxiosRequest.get(`/api/public/fun/fun_info`, { baseURL });
};

// 空投信息
export const getAirdropInfo = async (): Promise<AirdropData> => {
  return AxiosRequest.get(`/api/private/fun/airdrop/info`, { baseURL });
};

// staking 信息
export const getStakingInfo = async (): Promise<StakingData> => {
  return AxiosRequest.get(`/api/private/fun/staking_info`, { baseURL });
};
