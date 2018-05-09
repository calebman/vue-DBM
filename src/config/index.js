/*
 * @Author: calebman 
 * @Date: 2018-03-13 17:29:31 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-09 10:24:57
 */

import dev from './config.dev';
import prod from './config.prod';

const conf = process.env.NODE_ENV === 'production' ? prod : dev;

export default conf;
