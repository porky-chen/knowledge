/**
 * Copyright (c) 2021 Guangdong Sun Railway Information Technology, Inc.
 * All rights reserved.
 *
 * @author wenteng
 *
 * Description:
 * Changelog:
 *
 * Revision:
 */
import config from '../../package.json'

const versionList = {
  '1059': '1.0.59',
}

// 1059 版本下。su-table的row-click不再抛出
let versionOf1059 = () => {
  return versionIsValid(versionList['1059'])
}

let versionIsValid = (version) => {
  return version > config.version
}

export {
  versionOf1059,
}
