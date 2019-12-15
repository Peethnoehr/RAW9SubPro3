﻿﻿﻿
require.config({
    baseUrl: "js",
    paths: {
        jquery: "../lib/jquery/dist/jquery",
        knockout: "../lib/knockout/build/output/knockout-latest.debug",
        text: "../lib/requirejs-text/text",
        jqcloud: "../lib/jqcloud2/dist/jqcloud",
        dataService: "services/dataService",
        store: "services/store"
    },
    shim: {
        jqcloud: ["jquery"]
    }
});

require(["knockout"], function(ko) {
    ko.components.register('login', {
        viewModel: { require: "components/login/login" },
        template: { require: "text!components/login/login.html" }
    });
    ko.components.register('post', {
        viewModel: { require: "components/post/post" },
        template: { require: "text!components/post/post.html" }
    });
    ko.components.register('search', {
        viewModel: { require: "components/search/search" },
        template: { require: "text!components/search/search.html" }
    });
    ko.components.register('searchhistory', {
        viewModel: { require: "components/searchhistory/searchhistory" },
        template: { require: "text!components/searchhistory/searchhistory.html" }
    });
    ko.components.register('profile', {
        viewModel: { require: "components/profile/profile" },
        template: { require: "text!components/profile/profile.html" }
    });
    ko.components.register('marking', {
        viewModel: { require: "components/marking/marking" },
        template: { require: "text!components/marking/marking.html" }
    });
});


require(["knockout", "store", "navbarApp"], function (ko, store, app) {
    store.subscribe(() => console.log(store.getState()));
    ko.applyBindings(app);
});