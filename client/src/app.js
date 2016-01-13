/**
 * Copyright Notice 
 * 
 * All trademarks mentioned herein belong to their respective 
 * owners. Unless identified with the designation "COPY FREE", the 
 * contents of this document is copyrighted by Charles F. Day & 
 * Associates, LLC.. Charles F. Day & Associates, LLC. hereby authorizes 
 * you to copy this document for non-commercial use within your 
 * organization only. In consideration of this authorization, you agree 
 * that any copy of these documents you make shall retain all copyright 
 * and other proprietary notices contained herein. You may not otherwise 
 * copy or transmit the contents of this code either electronically or in 
 * hard copies. You may not alter the content of this document in any 
 * manner. If you are interested in using the contents of this document 
 * in any manner except as described above, please contact Charles F. Day 
 * & Associates, LLC. at for information on licensing. 
 * 
 * Individual documents published by Charles F. Day & Associates, LLC. 
 * may contain other proprietary notices and copyright information 
 * specific to that individual document. Nothing contained herein shall 
 * be construed as conferring by implication, estoppel or otherwise any 
 * license or right under any patent, trademark or other property right 
 * of Charles F. Day & Associates, LLC. or any third party. Except as 
 * expressly provided above nothing contained herein shall be construed 
 * as conferring any license or right under any copyright or other 
 * property right of Charles F. Day & Associates, LLC. or any third 
 * party. Note that any product, process, or technology in this document 
 * may be the subject of other intellectual property rights reserved by 
 * Charles F. Day & Associates, LLC. and may not be licensed here under. 
 * 
 * Copyright Charles F. Day & Associates, LLC. (2015) All rights reserved.
 * 
 * @author James J Jones
 */

var angular = require('angular');

require('angular-storage');
require('angular-jwt');
//require('angular-route');
require('angular-ui-router');
require('./D3Viz.Constants');
require('./D3Viz.Services');
require('./D3Viz.States');

var HomeCtrl = require('./controllers/home/HomeCtrl');

var LogGeneratorCtrl = require('./controllers/log-generator/LogGeneratorCtrl');

var ScatterChart_Directive = require('./directives/scatterChart/ScatterChart.Directive.js');

var app = angular.module('D3Viz', ['angular-storage', 'angular-jwt', 'ui.router', 'D3Viz.Constants', 'D3Viz.Services', 'D3Viz.States']);

app.controller('HomeCtrl', ['$http', '$scope', '$state', 'store', HomeCtrl]);
app.controller('LogGeneratorCtrl', ['$interval', '$rootScope', '$scope', LogGeneratorCtrl]);

app.directive('scatterChart', ['d3', ScatterChart_Directive]);