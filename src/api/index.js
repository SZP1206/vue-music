import request from "@/utils/request.js";
// banner
export const getShuffling = params => {
  return request({
    method: "GET",
    url: "/banner",
    params
  });
};
// 登录
export const userLogin = data => {
  return request({
    method: "POST",
    url: "/login/cellphone",
    data
  });
};
// 获取每日推荐歌单
export const getResource = params => {
  return request({
    method: "GET",
    url: "/personalized",
    params
  });
};
// 获取独家放送
export const getExclusive = () => {
  return request({
    method: "GET",
    url: "/personalized/privatecontent"
  });
};
// 推荐新音乐
export const getNewsong = () => {
  return request({
    method: "GET",
    url: "/personalized/newsong"
  });
};
// 推荐mv
export const getMv = () => {
  return request({
    method: "GET",
    url: "/personalized/mv"
  });
};
