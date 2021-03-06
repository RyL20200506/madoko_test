/*---------------------------------------------------------------------------
  Copyright 2015 Daan Leijen, Microsoft Corporation.
 
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/


if (typeof define !== 'function') { var define = require('amdefine')(module) }
define([],function() {

// Given a language id or name, return a valid language id and a non-empty array of a language names,
// where langnames[0] is the locale language name, and langnames[1] (if present) the US name.
// returns: { langid: string, langnames: [string] }.
function getLocaleInfo( name ) {
  var langname = (name||"?").replace(/[_\.]/g, "-");
  var langid   = langname.toLowerCase(); 
  var langnames = null;
  var cap = /^([a-z][a-z])(?:-([A-Z][A-Z])(-.*)?)?$/.exec(langname);
  if (cap) {
    // language code
    if (cap[2]) {
      langid = cap[1] + "-" + cap[2];
    }
    else {
      langid = locales["primary-dialects"][cap[1]];
      if (!langid) langid = cap[1];
    }
  }
  else {
    // find through language name
    properties(languages).some( function(id) {
      return languages[id].some( function(fullname) {
        var names = fullname.replace(/[\(\),;\.]/g,"").toLowerCase().split(/\s+/); // TODO: cache this?
        return names.some( function(lname) {
          if (lname===langid) {
            langid    = id;
            langnames = languages[id];
            return true;
          }
          else return false;
        });
      });
    });
  }
  // map to more common langid if necessary
  compatid = langid;    
  if (localeCompat[langid]) langid = localeCompat[langid];

  // try to find the language names
  if (!langnames) {
    if (languages[langid]) {
      langnames = languages[langid];
    }
    else {
      // we do not recognize this language...
      langid = "en-US";
      langnames = [langname];
    }
  }
  return { langid: langid, langnames: langnames, originalid: compatid };
}


var locales =
// 2015-12-21: Here follows the literal content of 'locales.json' from https://github.com/citation-style-language/locales
{
    "primary-dialects": {
        "af": "af-ZA",
        "ar": "ar",
        "bg": "bg-BG",
        "ca": "ca-AD",
        "cs": "cs-CZ",
        "cy": "cy-GB",
        "da": "da-DK",
        "de": "de-DE",
        "el": "el-GR",
        "en": "en-US",
        "es": "es-ES",
        "et": "et-EE",
        "eu": "eu",
        "fa": "fa-IR",
        "fi": "fi-FI",
        "fr": "fr-FR",
        "he": "he-IL",
        "hr": "hr-HR",
        "hu": "hu-HU",
        "id": "id-ID",
        "is": "is-IS",
        "it": "it-IT",
        "ja": "ja-JP",
        "km": "km-KH",
        "ko": "ko-KR",
        "lt": "lt-LT",
        "lv": "lv-LV",
        "mn": "mn-MN",
        "nb": "nb-NO",
        "nl": "nl-NL",
        "nn": "nn-NO",
        "pl": "pl-PL",
        "pt": "pt-PT",
        "ro": "ro-RO",
        "ru": "ru-RU",
        "sk": "sk-SK",
        "sl": "sl-SI",
        "sr": "sr-RS",
        "sv": "sv-SE",
        "th": "th-TH",
        "tr": "tr-TR",
        "uk": "uk-UA",
        "vi": "vi-VN",
        "zh": "zh-CN"
    },
    "language-names": {
        "af-ZA": [
            "Afrikaans",
            "Afrikaans"
        ],
        "ar": [
            "??????????????",
            "Arabic"
        ],
        "bg-BG": [
            "??????????????????",
            "Bulgarian"
        ],
        "ca-AD": [
            "Catal??",
            "Catalan"
        ],
        "cs-CZ": [
            "??e??tina",
            "Czech"
        ],
        "cy-GB": [
            "Cymraeg",
            "Welsh"
        ],
        "da-DK": [
            "Dansk",
            "Danish"
        ],
        "de-DE": [
            "Deutsch (Deutschland)",
            "German (Germany)"
        ],
        "de-AT": [
            "Deutsch (??sterreich)",
            "German (Austria)"
        ],
        "de-CH": [
            "Deutsch (Schweiz)",
            "German (Switzerland)"
        ],
        "el-GR": [
            "????????????????",
            "Greek"
        ],
        "en-US": [
            "English (US)",
            "English (US)"
        ],
        "en-GB": [
            "English (UK)",
            "English (UK)"
        ],
        "es-ES": [
            "Espa??ol (Espa??a)",
            "Spanish (Spain)"
        ],
        "es-CL": [
            "Espa??ol (Chile)",
            "Spanish (Chile)"
        ],
        "es-MX": [
            "Espa??ol (M??xico)",
            "Spanish (Mexico)"
        ],
        "et-EE": [
            "Eesti",
            "Estonian"
        ],
        "eu": [
            "Euskara",
            "Basque"
        ],
        "fa-IR": [
            "??????????",
            "Persian"
        ],
        "fi-FI": [
            "Suomi",
            "Finnish"
        ],
        "fr-FR": [
            "Fran??ais (France)",
            "French (France)"
        ],
        "fr-CA": [
            "Fran??ais (Canada)",
            "French (Canada)"
        ],
        "he-IL": [
            "??????????",
            "Hebrew"
        ],
        "hr-HR": [
            "Hrvatski",
            "Croatian"
        ],
        "hu-HU": [
            "Magyar",
            "Hungarian"
        ],
        "id-ID": [
            "Bahasa Indonesia",
            "Indonesian"    
        ],
        "is-IS": [
            "??slenska",
            "Icelandic"
        ],
        "it-IT": [
            "Italiano",
            "Italian"
        ],
        "ja-JP": [
            "?????????",
            "Japanese"
        ],
        "km-KH": [
            "???????????????????????????",
            "Khmer"
        ],
        "ko-KR": [
            "?????????",
            "Korean"
        ],
        "lt-LT": [
            "Lietuvi??",
            "Lithuanian"
        ],
        "lv-LV": [
            "Latvie??u",
            "Latvian"
        ],
        "mn-MN": [
            "????????????",
            "Mongolian"
        ],
        "nb-NO": [
            "Norsk bokm??l",
            "Norwegian (Bokm??l)"
        ],
        "nl-NL": [
            "Nederlands",
            "Dutch"
        ],
        "nn-NO": [
            "Norsk nynorsk",
            "Norwegian (Nynorsk)"
        ],
        "pl-PL": [
            "Polski",
            "Polish"
        ],
        "pt-PT": [
            "Portugu??s (Portugal)",
            "Portuguese (Portugal)"
        ],
        "pt-BR": [
            "Portugu??s (Brasil)",
            "Portuguese (Brazil)"
        ],
        "ro-RO": [
            "Rom??n??",
            "Romanian"
        ],
        "ru-RU": [
            "??????????????",
            "Russian"
        ],
        "sk-SK": [
            "Sloven??ina",
            "Slovak"
        ],
        "sl-SI": [
            "Sloven????ina",
            "Slovenian"
        ],
        "sr-RS": [
            "???????????? / Srpski",
            "Serbian"
        ],
        "sv-SE": [
            "Svenska",
            "Swedish"
        ],
        "th-TH": [
            "?????????",
            "Thai"
        ],
        "tr-TR": [
            "T??rk??e",
            "Turkish"
        ],
        "uk-UA": [
            "????????????????????",
            "Ukrainian"
        ],
        "vi-VN": [
            "Ti???ng Vi???t",
            "Vietnamese"
        ],
        "zh-CN": [
            "?????? (????????????)",
            "Chinese (PRC)"
        ],
        "zh-TW": [
            "?????? (??????)",
            "Chinese (Taiwan)"
        ]
    }
}
// end of 'locales.json'
;


var localeCompat = {
  // special mapping since the variants are not 
  // directly supported by current locales in CSL
  "en-EN": "en-US",
  "en-CA": "en-US",
  "en-AU": "en-GB",
  "en-NZ": "en-GB",
}

var languages = extend( extend({}, locales["language-names"] ), {
   "en-GB": ["British","UKenglish"],
   "en-US": ["American","USenglish"],
   "en-AU": ["English (AU)","Australian"],
   "en-NZ": ["English (NZ)","Newzealand"],
   "de-AT": ["Austrian"],
   "fr-CA": ["Canadian"],
});

function extend( target, obj ) {
  properties(obj).forEach( function(key) {
    if (target[key] && target[key] instanceof Array) {
      target[key].concat( obj[key] );
    }
    else {
      target[key] = obj[key];
    }
  });
  return target;
}

function properties(obj) {
  var attrs = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      attrs.push(key);
    }
  } 
  return attrs;
}


return {
  getLocaleInfo: getLocaleInfo,
}

});
