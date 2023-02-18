import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAccessToken, getRefreshToken, processAuthResponse } from 'utils/utils';
import { postOrderRequest } from 'utils/burger-api';
import { TIngredientId } from 'services/types/data';
import { refreshTokenRequest } from 'utils/auth-api';
import { TOrderResponseBody } from 'services/types/response';
// TODO Вынести в абстракцию
export const makeOrder = createAsyncThunk(
  'order/place-order',
  async (ingredientsIds: ReadonlyArray<TIngredientId>) => {
    try {
      const accessToken = getAccessToken();
      if (!!accessToken) {
        const response = await postOrderRequest(accessToken, ingredientsIds);
        if (response.success) {
          return response;
        }
      }
      const refreshToken = getRefreshToken();
      if (!!refreshToken) {
        const response = await refreshTokenRequest(refreshToken);
        if (response.success) {
          await processAuthResponse(response);
          const newAccessToken = getAccessToken();
          if (!!newAccessToken) {
            return postOrderRequest(newAccessToken, ingredientsIds);
          }
        }
        return response;
      }
      const responseBody: TOrderResponseBody = {
        success: false,
        message: 'Refresh token is missed',
      };
      return responseBody;
      // return callRequestWithAccessToken(postOrderRequest, ingredientsIds);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);
