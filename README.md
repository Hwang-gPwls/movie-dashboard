# movie-dashboard

영화 대시보드 로그인, 조회, 추가, 수정, 삭제 기능 제공

<br/><br/>

# 사용 기술

## Frontend

- Javascript(ES6) / HTML / CSS
- React
- React Query
- Recoil
- styled-components
- node v16.x
- Typescript

## DevOps

- Git
- GitHub

# 로컬 실행 명령어

```
# 로컬 실행
$ yarn start

# 패키지 설치
$ yarn
```

<br/><br/>

# 기능 구현 목록

1. 로그인 페이지

   - route: /login
   - 구현 상태: 완료

2. movie 목록 조회 페이지

   1. 목록 리스트
      - route: ‘/movie/list’
      - 구현 상태: 완료
   2. 목록에 항목 추가
      - route: ‘/movie/item/add’
      - 구현 상태: 완료
      - 참고 사항
        - [Issues 1] 내용과 같이 list id 값이 1인 아이템 추가 시, edit permission error가 발생
        - 리스트 추가 ([POST] /list) 후, 아이템 추가하도록 처리
   3. 목록 항목 수정
      - route: ‘/movie/item/add’
      - 구현 상태: 완료
      - 참고 사항
        - [Issues 1] 내용과 같이 list id 값이 1인 아이템 수정 시, edit permission error가 발생
        - 2번을 통해 추가한 값에 대해 수정하도록 처리
        - 간헐적 서버장애 발생
   4. 목록 항목 삭제
      - route: ‘/movie/item/delete’
      - 구현 상태: 완료
      - 참고 사항
        - [Issues 1] 내용과 같이 list id 값이 1인 아이템 삭제 시, edit permission error가 발생
        - 번을 통해 추가한 값에 대해 삭제하도록 처리

3. 검색 페이지
   - route: /search
   - 구현 상태: 완료

<br/><br/>

# Issues

## 1. 등록, 수정, 삭제 시에 edit permission error 발생

### 내용

등록, 수정, 삭제 시에 edit permission error 발생

### 원인

등록, 수정 삭제시에는 과제로 지정된 list id 1번 값에 대한 edit 권한이 없어 edit Permission 에러 발생</br>
본인이 생성한 list에 대해서만 item 추가가 가능한 것으로 파악됨

```bash
# Error 내용
{"status_code":38,"status_message":"You don't have permission to edit this resource.","success":false}
```

### 해결

List를 새로 추가 후, 아이템을 생성하도록 처리

<br/><br/>

## 2. list에 Item 추가 시, item id가 기존 특정 리스트에 없는 값일 경우, 추가 되지 않는 문제 발생

### 내용

list에 Item 추가 시, item id가 기존 특정 리스트에 없는 값일 경우, 추가 되지 않는 문제 발생

### 원인

특정 list의 값을 복제 해서 새로 생성 된 list에 넣어 주는 동작 방식으로 파악 되어지고, 해당 list에 parameter로 보낸 item 값이 없을 경우 추가 되지 않는 것으로 파악됨

```bash
# Error 내용
{"results":[{"media_id":"53453543","media_type":"movie","success":false}],"status_code":1,"status_message":"Success.","success":true}
```

### 해결

item id를 2로 고정하여 임시적으로 무조건 추가할 수 있도록 구현함
