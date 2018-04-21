import { call, put } from 'redux-saga/effects'
import OrdersActions from '../Redux/OrdersRedux'

export function * getOrders (api, action) {
  const response = yield call(api.getOrders)

  if (response.ok) {
    yield put(OrdersActions.ordersSuccess(response.data))
  } else {
    yield put(OrdersActions.ordersFailure())
  }
}

export function * completeOrder (api, action) {
  const { id } = action
  const response = yield call(api.completeOrder, id)

  if (response.ok) {
    yield put(OrdersActions.ordersSuccess(response.data))
  } else {
    yield put(OrdersActions.ordersFailure())
  }
}