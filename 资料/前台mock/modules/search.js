import Mock from "mockjs";
import { searchList } from "./searchData";

// 这里的请求方式: post/get/put 只能是小写，
Mock.mock("/mock/list", "post", function (options) {
  const params = JSON.parse(options.body);
  return searchList;
});
