# manito-app

[![Build Status](https://travis-ci.com/your-manito/manito-app.svg?token=A1hypbAdeKzeU8epEPop&branch=main)](https://travis-ci.com/your-manito/manito-app)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


<img src="https://img.shields.io/badge/Android-3DDC84?style=flat-square&logo=android&logoColor=white"/></a>
<img src="https://img.shields.io/badge/iOS-000000?style=flat-square&logo=ios&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Typescript-007acc?style=flat-square&logo=typescript&logoColor=white"/></a>
<img src="https://img.shields.io/badge/React-61dafb?style=flat-square&logo=React&logoColor=white"/></a>
<img src="https://img.shields.io/badge/MobX-764ABC?style=flat-square&logo=redux&logoColor=white"/></a>
<img src="https://img.shields.io/badge/css-1572B6?style=flat-square&logo=css3&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Travis-3EAAAF?style=flat-square&logo=travis&logoColor=white"/></a>
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white"/></a>

## 디렉터리 정보
- Atomic Design 구조
- typescript ( js 대신 )
 
## 라이브러리

### React-Native 환경 세팅
#### 참고링크
1. mac에서 환경설정(ios, android simulate check successfully)
https://dev-yakuza.posstree.com/ko/react-native/install-on-mac/ 

### store, state 관리 : mobx
#### 참고링크 
1. https://woowabros.github.io/experience/2019/01/02/kimcj-react-mobx.html

### Rounting : react-navigation V5
 여러 모듈이 있었으나, react-native-navigation과 react-navigation 이 가장 나았고, 이 중에서 가장 검증된 라이브러리인 후자 선택

#### 참고링크
1. https://reactnative.dev/docs/navigation
2. https://reactnavigation.org/docs/getting-started
3. https://medium.com/react-native-seoul/react-navigation-v5-네비게이션-소식-파해치기-및-타입별-예제-c8f2919b49e9

### Login for Kakao : @react-native-seoul/kakao-login참고(사용은 안함)
1. Using Ios SDK-v2 which is the upgrade version from LegacyiosSDK(KakaoOpenSDK). 
 - iOS 11.0 이상
 - Xcode 11.0 이상
 - Swift 4.2 이상
 - Cocoapods 1.8 이상
 - iOS Deployment Target 11.0 이상
 #### 참고링크
 1. https://developers.kakao.com/docs/latest/ko/getting-started/sdk-ios
 2. https://sujinnaljin.medium.com/ios-카카오톡-소셜-로그인-58a525e6f219


## 이미지 업로드 : react-native-image-picker