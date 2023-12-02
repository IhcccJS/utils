import FakeApi from './fake-api/index';
import arrayReplace from './array-replace/index';
import awaitWrapper from './await-wrapper/index';
import copyText from './copy-text/index';
import countRatio from './count-ratio/index';
import dataFormat from './data-format/index';
import decimal from './decimal/index';
import delay from './delay/index';
import eventEmitter, { EventEmitter } from './event-emitter/index';
import fileSizeFormatter from './file-size-formatter/index';
import getBase64 from './get-base64/index';
import {
  changePageParams,
  getServerPath,
  serverPathReplace,
  setHeader,
  toFormData,
} from './interceptor/index';
import isLngLat from './is-lng-lat/index';
import jsonStringFormat from './json-string-format/index';
import loadCss from './load-css/index';
import loadScript from './load-script/index';
import mapToTree from './map-to-tree/index';
import omitFormData from './omit-form-data/index';
import randomColor from './random-color/index';
import { getStorage, setStorage, removeStorage } from './storage/index';
import timeFormat from './time-format/index';
import toFixed from './to-fixed/index';
import {
  isArray,
  isBoolean,
  isFunction,
  isNumber,
  isObject,
  isString,
  isSymbol,
  isNull,
  isUndefined,
} from './types/index';
import uuid from './uuid/index';

const ApiMock = FakeApi;

export {
  ApiMock,
  FakeApi,
  arrayReplace,
  awaitWrapper,
  copyText,
  countRatio,
  dataFormat,
  decimal,
  delay,
  eventEmitter,
  EventEmitter,
  fileSizeFormatter,
  getBase64,
  changePageParams,
  getServerPath,
  serverPathReplace,
  setHeader,
  toFormData,
  isLngLat,
  jsonStringFormat,
  loadCss,
  loadScript,
  mapToTree,
  omitFormData,
  randomColor,
  getStorage,
  setStorage,
  removeStorage,
  timeFormat,
  toFixed,
  isArray,
  isBoolean,
  isFunction,
  isNumber,
  isObject,
  isString,
  isSymbol,
  isNull,
  isUndefined,
  uuid,
};
