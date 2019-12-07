﻿﻿define(["knockout", "store"], function (ko, store) {

    var menuElements = [
        {
            name: "Login",
            component: "login"
        },
        {
            name: "Markings",
            component: "marking"
        },
        {
            name: "Search",
            component: "search"
        },
        {
            name: "Component 1",
            component: "component2"
        },
        {
            name: "Component 2",
            component: "component2"
        }
    ];

    var currentMenu = ko.observable(menuElements[0]);
    var currentComponent = ko.observable(currentMenu().component);
    
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
        isSelected
    };
});