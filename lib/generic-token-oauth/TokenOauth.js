"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var oauth_1 = require("oauth");
var errors_1 = require("./errors");
var config_1 = require("./config");
var utils_1 = require("./utils");
var TokenOauth = /** @class */ (function () {
    function TokenOauth(_a) {
        var _this = this;
        var authType = _a.authType, clientId = _a.clientId, clientSecret = _a.clientSecret, authUrl = _a.authUrl, tokenUrl = _a.tokenUrl, profileUrl = _a.profileUrl;
        this.name = 'TokenOauth';
        this._validateOptions = function (_a) {
            var authType = _a.authType, clientId = _a.clientId, clientSecret = _a.clientSecret;
            if (!authType || !clientId || !clientSecret) {
                return {
                    err: new errors_1.InvalidOptionsError('Invalid Options: Please provide authType, clientId and clientSecret'),
                };
            }
            return {};
        };
        this.authenticate = function (authCode) { return __awaiter(_this, void 0, void 0, function () {
            var _a, accessTokenErr, accessToken, _b, userProfileErr, userProfile, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._getAccessToken(authCode)];
                    case 1:
                        _a = _c.sent(), accessTokenErr = _a.err, accessToken = _a.accessToken;
                        if (accessTokenErr) {
                            return [2 /*return*/, { err: accessTokenErr }];
                        }
                        return [4 /*yield*/, this._getUserProfile(accessToken)];
                    case 2:
                        _b = _c.sent(), userProfileErr = _b.err, userProfile = _b.userProfile;
                        if (userProfileErr) {
                            return [2 /*return*/, { err: userProfileErr }];
                        }
                        return [2 /*return*/, { userProfile: userProfile }];
                    case 3:
                        err_1 = _c.sent();
                        // TODO -> write own error types
                        return [2 /*return*/, { err: err_1 }];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this._getAccessToken = function (authCode) {
            return new Promise(function (resolve) {
                if (_this._authType === 'accessToken') {
                    return resolve({ accessToken: authCode });
                }
                _this._oauth2.getOAuthAccessToken(authCode, {}, function (err, accessToken) {
                    if (err) {
                        var parsedErr = _this._parseError(err);
                        return resolve({ err: parsedErr, accessToken: '' });
                    }
                    resolve({ accessToken: accessToken });
                });
            });
        };
        this._getUserProfile = function (accessToken) {
            return new Promise(function (resolve) {
                _this._oauth2.get(_this._profileUrl, accessToken, function (err, result) {
                    if (err) {
                        var parsedErr = _this._parseError(err);
                        return resolve({
                            err: parsedErr,
                        });
                    }
                    if (result && typeof result === 'string') {
                        var userProfileData = utils_1.parseJSONObject(result);
                        if (userProfileData) {
                            var userProfile = _this._formatProfileData(userProfileData);
                            return resolve({
                                userProfile: userProfile,
                            });
                        }
                    }
                    resolve({
                        err: {
                            type: 'parseError',
                            message: 'Profile response was not a valid json object string',
                        },
                    });
                });
            });
        };
        this._formatProfileData = function (profileData) {
            var acceptedFields = config_1.default.profile.acceptedFields;
            // construct user profile with accepted fields
            var userProfile = acceptedFields.reduce(function (profile, _a) {
                var _b;
                var field = _a.field, possibleExternalFields = _a.possibleExternalFields;
                var rawData = profile._rawProfileData;
                var externalFieldName = possibleExternalFields.find(function (possibleField) { return rawData[possibleField]; });
                if (externalFieldName) {
                    return Object.assign({}, profile, (_b = {}, _b[field] = rawData[externalFieldName], _b));
                }
                return profile;
            }, {
                id: '',
                _rawProfileData: profileData,
            });
            return userProfile;
        };
        // TODO -> process more error types
        this._parseError = function (err) {
            var data = err.data;
            if (data) {
                var parsedErrorData = utils_1.parseJSONObject(data);
                if (parsedErrorData) {
                    // TODO -> parse status code to determine own auth type
                    var _a = parsedErrorData, _b = _a.error, error = _b === void 0 ? '' : _b, _c = _a.error_description, errorDescription = _c === void 0 ? '' : _c;
                    return {
                        type: 'authError',
                        message: error && errorDescription ? error + " (" + errorDescription + ")" : error || errorDescription,
                    };
                }
            }
            return {
                type: 'authError',
                message: String(data),
            };
        };
        var err = this._validateOptions({ authType: authType, clientId: clientId, clientSecret: clientSecret, authUrl: authUrl, tokenUrl: tokenUrl, profileUrl: profileUrl }).err;
        if (err) {
            throw err;
        }
        this._authType = authType;
        this._clientId = clientId;
        this._clientSecret = clientSecret;
        this._authUrl = authUrl || config_1.default.oauth.defaultOptions.authUrl;
        this._tokenUrl = tokenUrl || config_1.default.oauth.defaultOptions.tokenUrl;
        this._profileUrl = profileUrl || config_1.default.oauth.defaultOptions.profileUrl;
        this._oauth2 = new oauth_1.OAuth2(clientId, clientSecret, '', authUrl, tokenUrl);
        this._oauth2.useAuthorizationHeaderforGET(true);
    }
    return TokenOauth;
}());
module.exports = TokenOauth;
