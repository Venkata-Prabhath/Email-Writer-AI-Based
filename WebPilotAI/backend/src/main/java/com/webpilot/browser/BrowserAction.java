package com.webpilot.browser;

import com.fasterxml.jackson.annotation.JsonAlias;

public enum BrowserAction {

    OPEN,
    SEARCH,
    CLICK,
    TYPE,
    WAIT,
    SCROLL,
    SELECT,
    UPLOAD,
    DOWNLOAD,

    @JsonAlias("EXTRACT")
    EXTRACT_TEXT,

    HOVER,
    PRESS_KEY,
    BACK,
    FORWARD,
    REFRESH,
    SCREENSHOT,
    CLOSE
}