/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export type TError = {
    data: {
        message: string;
        stack: string;
        success: boolean;
        errorSources: any;
    };
    status: number;
};

export type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
};

export type TResponse<T> = {
    data?: T;
    error?: TError;
    meta?: TMeta;
    success: boolean;
    message: string;
};

export type TQueryParam = {
    name: string;
    value: boolean | React.Key;
};
