import { saveAs } from 'file-saver';
import FakeApi from './fake-api/index';
import arrayReplace from './array-replace/index';
import awaitWrapper from './await-wrapper/index';
import copyText from './copy-text/index';
import countRatio from './count-ratio/index';
import dataFormat from './data-format/index';
import decimal from './decimal/index';
import delay from './delay/index';
import eventEmitter, { EventEmitter } from './event-emitter/index';
import EventEmitter3 from 'eventemitter3';
import fileSizeFormatter from './file-size-formatter/index';
import { forEachPromised, promiseForEach } from './foreach/index';
import getBase64 from './get-base64/index';
import {
  changePageParams,
  getServerPath,
  serverPathReplace,
  setHeader,
  toFormData,
  fakeRequest,
} from './interceptor/index';
import isLngLat from './is-lng-lat/index';
import joinString from './join-string/index';
import jsonStringFormat from './json-string-format/index';
import { loadCss, loadScript } from './load-resource/index';
import mapToTree from './map-to-tree';
import treeFilter from './tree-filter';
import treeFind from './tree-find';
import treeForEach from './tree-for-each';
import treeFromArray from './tree-from-array';
import treeMap from './tree-map';
import treeMatch from './tree-match';
import treeToArray from './tree-to-array';
import omitData from './omit-data/index';
import random from './random/index';
import randomColorHex from './color/random-color-hex';
import randomColorRgb from './color/random-color-rgb';
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

/** @deprecated `ApiMock` is deprecated, use `FakeApi` instead. */
const ApiMock = FakeApi;

export {
  saveAs,
  ApiMock,
  FakeApi,
  arrayReplace,
  awaitWrapper,
  copyText,
  countRatio,
  dataFormat,
  decimal,
  delay,
  /** @deprecated `eventEmitter` is deprecated, use `EventEmitter3` instead. */
  eventEmitter,
  /** @deprecated `EventEmitter` is deprecated, use `EventEmitter3` instead. */
  EventEmitter,
  EventEmitter3,
  fileSizeFormatter,
  forEachPromised,
  promiseForEach,
  getBase64,
  changePageParams,
  getServerPath,
  serverPathReplace,
  setHeader,
  toFormData,
  fakeRequest,
  isLngLat,
  joinString,
  jsonStringFormat,
  loadCss,
  loadScript,
  /** @deprecated `mapToTree` is deprecated, use `treeFromArray` instead. */
  mapToTree,
  treeFilter,
  treeFind,
  treeForEach,
  treeFromArray,
  treeMap,
  treeMatch,
  treeToArray,
  omitData,
  random,
  randomColorHex,
  randomColorRgb,
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
