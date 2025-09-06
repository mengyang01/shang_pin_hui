import Mock from "mockjs";
import { productCategoryData, bannerList, floorList } from "./homeData";

// 这里的请求方式: post/get/put 只能是小写，
Mock.mock("/mock/product/getBaseCategoryList", "get", productCategoryData);

Mock.mock("/mock/banner", "get", bannerList);

Mock.mock("/mock/floor", "get", floorList);
