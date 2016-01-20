/*
 * Copyright (c) 2015, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

$(function () {
    var categories = [];
    var selectedCategories = [];


    $.ajax({
        url: caramel.context + '/apis/asset/' + store.publisher.assetId + '/categories?type=' + store.publisher.type,
        type: 'GET',
        async: false,
        success: function (response) {
            selectedCategories = response.data;
        },
        error: function () {
            console.log("Error getting category.");
        }
    });

    // Get admin defined categories related to an asset.
    $.ajax({
        url: caramel.context + '/apis/asset/' + store.publisher.assetId + '/admincategories?type=' +
        store.publisher.type,
        type: 'GET',
        async: false,
        success: function (response) {
            categories = response.data;
        },
        error: function () {
            console.log("Error getting category.");
        }
    });

    $('#category-tags').select2({
        placeholder: 'Category Not Available',
        data: categories,
        cached: true,
        allowClear: true,
        multiple: true,
    }).on("select2:select", function (e) {
        var data = {};
        data.category = e.params.data.text;
        $.ajax({
            url: caramel.context + '/apis/asset/' + store.publisher.assetId + '/add-category?type=' +
            store.publisher.type,
            type: 'POST',
            async: false,
            data: JSON.stringify(data),
            contentType: 'application/json',
            error: function () {
                console.log("Error adding category.");
            }

        });


    }).on("select2:unselect", function (e) {
        var data = {};
        data.category = e.params.data.text;
        $.ajax({
            url: caramel.context + '/apis/asset/' + store.publisher.assetId + '/remove-category?type=' +
            store.publisher.type,
            type: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify(data),
            error: function () {
                console.log("Error removing category.");
            }
        });

    }).select2("val", selectedCategories);


});