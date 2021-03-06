import { call, put } from 'redux-saga/effects'
import VendorActions from '../Redux/VendorRedux'
import { NavigationActions } from 'react-navigation'
import Toast from 'react-native-simple-toast'

export function * getVendor (api, action) {
  const { vendor } = action
  // make the call to the api
  const response = yield call(api.getVendor)

  // success?
  if (response.ok) {
    yield put(VendorActions.vendorSuccess(response.data.vendor, response.data.items, response.data.hours))
  } else {
    yield put(VendorActions.failure())
    Toast.show('Something went wrong');
  }
}

export function * uploadLogo (api, action) {
  const { logo } = action
  const { nextRoute } = action
  const form = new FormData()

  form.append('logo', logo)
  const headers = {
    'Content-Type': 'multipart/form-data'
  }
  const response = yield call(api.uploadLogo, form, headers)

  if(response.ok) {
    yield put(VendorActions.logoSuccess(response.data))
    yield put(VendorActions.vendorRequest())
    yield put(NavigationActions.navigate({ routeName: nextRoute}))
  } else {
    Toast.show('Something went wrong, please try again');
  }
}

export function * updateVendor (api, action) {
  const { params } = action
  const { nextRoute } = action

  const response = yield call(api.updateVendor, params)

  if(response.ok) {
    yield put(VendorActions.updateSuccess(response.data.vendor, response.data.items, response.data.hours))
    if (response.data.vendor.setup_complete) {
      yield put(NavigationActions.navigate({ routeName: 'MainTabNav'}))
    } else {
      yield put(NavigationActions.navigate({ routeName: nextRoute}))
    }
  } else {
    Toast.show('Something went wrong, please try again');
  }
}

export function * updateHours (api, action) {
  const { params } = action
  const { nextRoute } = action.params

  const response = yield call(api.updateHours, params)

  if(response.ok) {
    yield put(VendorActions.updateSuccess(response.data.vendor, response.data.items, response.data.hours))
    if (response.data.vendor.setup_complete) {
      yield put(NavigationActions.navigate({ routeName: 'MainTabNav'}))
    } else {
      yield put(NavigationActions.navigate({ routeName: nextRoute}))
    }
  } else {
    Toast.show('Something went wrong, please try again');
  }
}
