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
import { forEachPromised, promiseForEach } from './foreach/index';
import getBase64 from './get-base64/index';
import { changePageParams, getServerPath, serverPathReplace, setHeader, toFormData } from './interceptor/index';
import isLngLat from './is-lng-lat/index';
import joinString from './join-string/index';
import jsonStringFormat from './json-string-format/index';
import { loadCss, loadScript } from './load-resource/index';
import mapToTree from './map-to-tree/index';
import omitFormData from './omit-form-data/index';
import random from './random/index';
import randomColorHex from './random-color-hex/index';
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

/** @deprecated ApiMock is deprecated, use `FakeApi` instead. */
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
  forEachPromised,
  promiseForEach,
  getBase64,
  changePageParams,
  getServerPath,
  serverPathReplace,
  setHeader,
  toFormData,
  isLngLat,
  joinString,
  jsonStringFormat,
  loadCss,
  loadScript,
  mapToTree,
  omitFormData,
  random,
  randomColorHex,
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
