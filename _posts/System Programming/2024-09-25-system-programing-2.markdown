---
title:  "2. "
excerpt: "&nbsp;&nbsp; "
date:   2024-09-25 20:30:20 +0900
categories: System Programming
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
permalink: posts/2-test
published: true
---
# 2.1 프로그램 설계

## a. 요구 사항 분석

&nbsp;&nbsp; Linux 시스템에서 간단한 전화번호부 프로그램을 작성한다. 이 프로그램은 두가지 정도의 조건을 충족시켜야 한다.

1. 삽입, 검색, 삭제, 리스트 기능을 제공해야 한다.
2. 두 개 이상의 소스 파일로 분할하여 작성해야 한다.

<br>

&nbsp;&nbsp; 전화번호부는 간단하게 생각하면 이름과 전화번호로 구성된다. 이는 구조체로 정의하면 된다. 또한 전화번호부에는 여러 사람의 정보를 저장해야 하므로 이 기능은 배열 또는 연결 리스트로 구현 할 수 있다.

&nbsp;&nbsp; 배열은 선언 시 크기가 고정되기 때문에 프로그램 실행 중 크기를 변경할 수 없다. 하지만 동적 메모리 할당을 통해 어느 정도 해결할 수 있지만 `realloc` 함수는 데이터 복사 비용이 발생하므로 메모리 차원에서 비효율적이다. 또한 삭제와 삽입 연산은 시간 복잡도가 O(n)이므로 전화번호부에 저장된 정보가 많을수록 성능이 저하된다는 문제가 있다.

&nbsp;&nbsp; 이에 반해 연결 리스트는 동적 메모리 할당을 통해 노드를 생성하기 때문에 크기를 동적으로 조절할 수 있다. 또한 삭제와 삽입 연산은 O(1)의 시간 복잡도를 가지기 때문에 전화번호부에 저장된 정보가 많아도 성능이 유지된다. 따라서 이 프로그램에서는 연결 리스트를 사용하여 전화번호부를 구현하겠다.

## b. 시스템 구조 설계

&nbsp;&nbsp; 전화번호부 프로그램은 크게 네 가지 기능을 제공해야 한다. 삽입, 검색, 삭제, 리스트 기능으로 이들을 구현하기 위해 각각의 함수를 작성하고 이들을 호출하는 메인 함수를 작성하겠다. 또한 이 프로그램은 두 개 이상의 소스 파일로 분할하여야 하므로 헤더 파일(.h), 소스 파일(.c), 메인 파일(.c)로 구성하겠다.

## c. 자료 구조 설계

&nbsp;&nbsp; 전화번호부에 저장할 정보는 이름과 전화번호로 구성하고 전화번호는 010-1234-5678과 같은 형식으로 저장한다. 따라서 이름과 전화번호 모두 `char` 형식으로 선언한다. 또한 연결 리스트로 관리할 것이므로 다음 노드를 가리키는 포인터도 저장한다. 이를 구조체로 정의하면 다음과 같다.

```c
typedef struct PhoneBook {
    char name[S_SIZE];      // S_SIZE = 50
    char number[N_SIZE];    // N_SIZE = 14
    struct PhoneBook* next;
} PhoneBook;
```

&nbsp;&nbsp; 이때 전화번호의 형식에 맞게 입력을 받기 위해 사용자가 입력한 전화번호를 바로 저장하지 않고 입력 유효성 검사 후에 저장하도록 한다. 이를 위해 전화번호 입력 유효성 검사 함수도 작성해야 한다는 것을 계획에 넣었다.

## d. 정리

&nbsp;&nbsp; 최종적으로 전화번호부 프로그램은 연결 리스트로 구현하며 삽입, 검색, 삭제, 리스트 기능을 제공한다. 각 함수는 다음과 같이 구성된다.

```c
void printMenu() {...}      // 메뉴 출력 함수
void printList() {...}      // 리스트 출력 함수
void addList() {...}        // 삽입 함수
void deleteList() {...}     // 삭제 함수
void searchList() {...}     // 검색 함수
void isPhoneNumber() {...}  // 전화번호 유효성 검사 함수
```

# 2.2 프로그램 구현

## a. phonebook.h

```c
#ifndef PHONEBOOK_H
#define PHONEBOOK_H
#include <stdbool.h>

#define S_SIZE 50
#define N_SIZE 14

typedef struct Phonebook {
    char name[S_SIZE];
    char num[N_SIZE];
    struct Phonebook* link;
} Phonebook;

void printMenu();
void printList(Phonebook* list);
void addList(Phonebook** list);
void deleteList(Phonebook** list);
void searchList(Phonebook** list);
void freeList(Phonebook* list);
void getInput(char* buffer, int size);
bool isPhoneNumber(const char* num);

#endif // PHONEBOOK_H
```

## b. phonebook.c

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "phonebook.h"

void printMenu() {
    printf("============================================\n");
    printf("                 전화번호부                 \n");
    printf("============================================\n");
    printf("              1. 전화번호 추가              \n");
    printf("              2. 전화번호 삭제              \n");
    printf("              3. 전화번호 검색              \n");
    printf("              4. 전화번호 나열              \n");
    printf("              5. 종료                       \n");
    printf("============================================\n\n");
}

void printList(Phonebook* list) {
    Phonebook* p = list;
    int i = 1;
  printf("\n=================== 목록 ===================\n\n");
    if (p == NULL) {
        printf("등록된 연락처가 없습니다.\n");
        return;
    }
    while (p != NULL) {
        printf("[%d] 이름: %s, 전화번호: %s\n", i++, p->name, p->num);
        p = p->link;
    }
    printf("\n");
}

void addList(Phonebook** list) {
    Phonebook* p = NULL;
    Phonebook* prev = NULL;
    char buffer[S_SIZE];
    char numBuffer[N_SIZE];

    while (1) {
        printf("이름(입력을 종료하려면 엔터): ");
        getInput(buffer, S_SIZE);
        if (buffer[0] == '\0') {
            printf("\n");
            break;
        }

        Phonebook* c = *list;
        while (c != NULL) {
            if (strcmp(c->name, buffer) == 0) {
                printf("\n이미 저장된 이름입니다.\n\n");
                return;
            }
            c = c->link;
        }

        p = (Phonebook*)malloc(sizeof(Phonebook));
        if (p == NULL) {
            fprintf(stderr, "메모리 할당 실패\n");
            break;
        }
        strcpy(p->name, buffer);

        do {
            printf("전화번호(010-0000-0000 형식): ");
            getInput(numBuffer, N_SIZE);
        } while (!isPhoneNumber(numBuffer));

        strcpy(p->num, numBuffer);
        p->link = NULL;

        if (*list == NULL) {
            *list = p;
        }
        else {
            prev = *list;
            while (prev->link != NULL) {
                prev = prev->link;
            }
            prev->link = p;
        }
        printf("연락처가 추가되었습니다: %s, %s\n\n", p->name, p->num);
        getchar();
    }
}

void deleteList(Phonebook** list) {
    Phonebook* p = *list;
    Phonebook* prev = NULL;
    char buffer[S_SIZE];

    printf("삭제할 이름을 입력하세요(취소하려면 엔터): ");
    getInput(buffer, S_SIZE);
    if (buffer[0] == '\0') {
        printf("\n");
        return;
    }

    while (p != NULL) {
        if (strcmp(p->name, buffer) == 0) {
            if (prev == NULL) // 삭제할 노드가 첫 번째일 경우
                *list = p->link;
            else
                prev->link = p->link;
            free(p);
            printf("\n%s의 연락처가 삭제되었습니다.\n\n", buffer);
            return;
        }
        prev = p;
        p = p->link;
    }

    printf("\n해당 이름의 연락처를 찾을 수 없습니다.\n\n");
}

void searchList(Phonebook** list) {
    Phonebook* p = *list;
    char buffer[S_SIZE];
    int found = 0;

    printf("검색할 이름을 입력하세요(취소하려면 엔터): ");
    getInput(buffer, S_SIZE);
    if (buffer[0] == '\0') return;

    while (p != NULL) {
        if (strcmp(p->name, buffer) == 0) {
            printf("\n이름: %s, 전화번호: %s\n\n", p->name, p->num);
            found = 1;
            break; // 중복된 이름이 있을 경우 첫 번째 것만 출력
        }
        p = p->link;
    }

    if (!found) {
        printf("\n해당 이름의 연락처를 찾을 수 없습니다.\n\n");
    }
}

void freeList(Phonebook* list) {
    Phonebook* p = list;
    Phonebook* next;

    while (p != NULL) {
        next = p->link;
        free(p);
        p = next;
    }
}

void getInput(char* buffer, int size) {
    if (fgets(buffer, size, stdin) != NULL) {
        buffer[strcspn(buffer, "\n")] = '\0'; // 개행 문자 제거
    }
}

bool isPhoneNumber(const char* num) {
    if (strlen(num) != 13)
        return false;
    for (int i = 0; i < 13; i++) {
        if (i == 0 || i == 2) {
            if (num[i] != '0')
                return false;
        }
        else if (i == 3 || i == 8) {
            if (num[i] != '-')
                return false;
        }
        else {
            if (num[i] < '0' || num[i] > '9')
                return false;
        }
    }
    return true;
}
```

## c. main.c

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include "phonebook.h"

int main(void) {
    Phonebook* list = NULL;
    int sel;

    while (1) {
        printMenu();
        printf("메뉴 선택: ");
        scanf("%d", &sel);
        getchar();

        switch (sel) {
            case 1:
                printf("\n============================================\n");
                addList(&list);
                break;
            case 2:
                printf("\n============================================\n");
                deleteList(&list);
                break;
            case 3:
                printf("\n============================================\n");
                searchList(&list);
                break;
            case 4:
                printList(list);
                break;
            case 5:
                printf("프로그램을 종료합니다.\n");
                freeList(list);
                return 0;
            default:
                printf("유효하지 않은 선택입니다. 다시 선택해주세요.\n\n");
                break;
        }
    }
}
```
