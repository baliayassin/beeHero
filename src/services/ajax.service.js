import * as ApiService from './api.service';

export const getUsers = (url) => {
  return ApiService.getUsers(url);
};

export const getUserPosts = (url) => {
    return ApiService.getPosts(url)
}
