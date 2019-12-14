﻿define(["knockout", "store"], function (ko, store) {
    var currentParams = ko.observable({
        userName: ko.observable(),
        email: ko.observable(),
        selectedPost: ko.observable()
    });
    var menuElements = [
        {
            name: "Login",
            component: "login"
        },
        {
            name: "Component 1",
            component: "component1"
        },
        {
            name: "Component 2",
            component: "component2"
        },
        {
            name: "Post",
            component: "post"
        },
        {
            name: "Search",
            component: "search"
        },
        {
            name: "Search History",
            component: "searchhistory"
        },
        {
            name: "Profile",
            component: "profile"
        },
        {
            name: "Markings",
            component: "marking"
        }
    ];

    var currentMenu = ko.observable(menuElements[0]);
    var currentComponent = ko.observable(currentMenu().component);
    
    //This is the method for changing component. All components have access to the store so we can reuse this.
    var changeContent = function (menu) {
        store.dispatch(store.actions.selectMenu(menu.name));
    };

    store.subscribe(() => {
        var menuName = store.getState().selectedMenu;
        var menu = menuElements.find(x => x.name === menuName);
        if (menu) {
            currentMenu(menu);
            currentComponent(menu.component);
        }
    });

    var isSelected = function(menu) {
        return menu === currentMenu() ? "active" : "";
    };

    return {
        currentComponent,
        menuElements,
        changeContent,
        isSelected,
        currentParams
    };
});