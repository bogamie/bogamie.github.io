---
title:  "2. Linux 시스템에서 간단한 전화번호부 프로그램 만들기"
excerpt: "&nbsp;&nbsp; Linux 시스템에서 C 언어로 간단한 전화번호부 프로그램을 만들어보고 직접 컴파일하여 실행시켜보자."
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

## b. 시스템 구조 설계

&nbsp;&nbsp; 전화번호부는 이름과 전화번호로 구성되므로 구조체로 정의하면 된다. 또한 전화번호부에는 여러 사람의 정보를 저장해야 하므로 이 기능은 구조체 배열 또는 연결 리스트로 구현 할 수 있다.

&nbsp;&nbsp; 배열은 선언 시 크기가 고정되기 때문에 프로그램 실행 중 크기를 변경할 수 없다. 하지만 동적 메모리 할당을 통해 어느 정도 해결할 수 있지만 `realloc` 함수는 데이터 복사 비용이 발생하므로 메모리 차원에서 비효율적이다. 또한 삭제와 삽입 연산은 시간 복잡도가 O(n)이므로 전화번호부에 저장된 정보가 많을수록 성능이 저하된다는 문제가 있다.

&nbsp;&nbsp; 이에 반해 연결 리스트는 동적 메모리 할당을 통해 노드를 생성하기 때문에 크기를 동적으로 조절할 수 있다. 또한 삭제와 삽입 연산은 O(1)의 시간 복잡도를 가지기 때문에 전화번호부에 저장된 정보가 많아도 성능이 유지된다. 따라서 이 프로그램에서는 연결 리스트를 사용하여 전화번호부를 구현하겠다.


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

### i. 헤더 가드

```c
#ifndef PHONEBOOK_H
#define PHONEBOOK_H
         ⋮
#endif
```

&nbsp;&nbsp; `phonebook.h` 헤더파일이 여러번 포함되는 것을 방지하기 위함이다. `phonebook.h` 매크로가 정의되어 있지 않으면 이 파일의 내용을 포함한다.

### ii. 라이브러리 포함

```c
#include <stdbool.h>
```

&nbsp;&nbsp; 입력 유효성 검사 함수의 return 값인 `boolean` 타입을 사용하기 위해 `stdbool.h` 헤더 파일을 포함시킨다.

### iii. 상수 및 구조체 정의

```c
#define S_SIZE 50
#define N_SIZE 14

typedef struct Phonebook {
    char name[S_SIZE];
    char num[N_SIZE];
    struct Phonebook* link;
} Phonebook;
```

&nbsp;&nbsp; `S_SIZE`는 이름을 저장하기 위한 배열의 크기, `N_SIZE`는 전화번호를 저장하기 위한 배열의 크기이다. `Phonebook` 구조체는 이름, 전화번호, 다음 노드를 가리키는 포인터 `link`로 구성된다. 이를 통해 전화번화부를 연결 리스트로 구현할 수 있다.

### iv. 함수 선언

```c
void printMenu();
void printList(Phonebook* list);
void addList(Phonebook** list);
void deleteList(Phonebook** list);
void searchList(Phonebook** list);
void freeList(Phonebook* list);
void getInput(char* buffer, int size);
bool isPhoneNumber(const char* num);
```

&nbsp;&nbsp; 각 함수의 기능은 다음과 같다.

* `printMenu()`: 메뉴를 출력하는 함수
* `printList()`: 전화번호부를 출력하는 함수
* `addList()`: 새로운 전화번호를 삽입하는 함수
* `deleteList()`: 전화번호부에서 특정 항목을 삭제하는 함수
* `searchList()`: 전화번호부에서 항목을 검색하는 함수
* `freeList()`: 동적으로 할당된 메모리를 해제하는 함수
* `getInput()`: 사용자로부터 문자열을 입력 받는 함수
* `isPhoneNumber()`: 입력받은 전화번호의 유효성을 검사하는 함수

<div class="bg"></div>

## b. phonebook.c

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "phonebook.h"

void printMenu() {
    printf("==================================================\n");
    printf("                    전화번호부                    \n");
    printf("==================================================\n");
    printf("                 1. 전화번호 추가                 \n");
    printf("                 2. 전화번호 삭제                 \n");
    printf("                 3. 전화번호 검색                 \n");
    printf("                 4. 전화번호 나열                 \n");
    printf("                 5. 종료                          \n");
    printf("==================================================\n\n");
}

void printList(Phonebook* list) {
    Phonebook* p = list;
    int i = 1;
  printf("\n====================== 목록 ======================\n\n");
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

        if (strlen(buffer) == size -1 && buffer[size - 2] != '\0') {
            while (getchar() != '\n'); // 입력 버퍼 비우기
        }
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
        else if (i == 1) {
            if (num[i] != '1')
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

### i. 라이브러리 포함

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "phonebook.h"
```

&nbsp;&nbsp; 표준 입출력, 동적 메모리 할당, 문자열 처리 함수를 사용하기 위해 각각의 헤더 파일을 포함시킨다. 또한 이전에 정의한 `phonebook.h` 헤더 파일도 포함시킨다.

### ii. 함수

#### 가. printMenu()

```c
void printMenu() {
    printf("==================================================\n");
    printf("                    전화번호부                    \n");
    printf("==================================================\n");
    printf("                 1. 전화번호 추가                 \n");
    printf("                 2. 전화번호 삭제                 \n");
    printf("                 3. 전화번호 검색                 \n");
    printf("                 4. 전화번호 나열                 \n");
    printf("                 5. 종료                          \n");
    printf("==================================================\n\n");
}
```

&nbsp;&nbsp; 전화번호부 프로그램의 메뉴를 출력하는 함수로 사용자가 선택할 수 있는 옵션을 보여준다.

#### 나. printList()

```c
void printList(Phonebook* list) {
    Phonebook* p = list;
    int i = 1;
  printf("\n====================== 목록 ======================\n\n");
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
```

&nbsp;&nbsp; 전화번호부를 출력하는 함수로 연결 리스트의 모든 노드를 순회하며 이름과 전화번호를 출력한다. 만약 전화번호부에 저장된 정보가 없다면 "등록된 연락처가 없습니다."를 출력한다.

#### 다. addList()

```c
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
    }
}
```

&nbsp;&nbsp; 사용자가 입력한 이름과 전화번호를 `getInput` 함수를 통해 받아 전화번호부에 삽입하는 함수로 이름이 중복되는 경우 삽입을 하지 않는다. 또한 `isPhoneNumber` 함수를 통해 전화번호의 유효성을 검사하고 유효하지 않은 경우 다시 입력을 받는다.

#### 라. deleteList()

```c
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
```

&nbsp;&nbsp; 사용자가 입력한 이름을 전화번호부에서 검색하여 해당 노드를 삭제하는 함수로 이름이 존재하지 않는 경우 삭제를 하지 않는다. 삭제할 노드의 이전 노드의 링크를 삭제할 노드의 다음 노드로 변경하고 삭제할 노드의 메모리를 해제한다. 이때 삭제할 노드가 첫 번째 노드일 경우 `list` 포인터를 다음 노드를 가리키도록 변경한다. 노드를 찾지 못하면 메시지를 출력한다.

#### 마. searchList()

```c
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
```

&nbsp;&nbsp; 사용자가 입력한 이름을 전화번호부에서 검색하여 해당 노드의 정보를 출력하는 함수이다. 이름이 존재하지 않는 경우 메시지를 출력한다.

#### 바. freeList()

```c
void freeList(Phonebook* list) {
    Phonebook* p = list;
    Phonebook* next;

    while (p != NULL) {
        next = p->link;
        free(p);
        p = next;
    }
}
```

&nbsp;&nbsp; 동적으로 할당된 메모리를 해제하는 함수로 전화번호부의 모든 노드를 순회하며 메모리를 해제한다. 

#### 사. getInput()

```c
void getInput(char* buffer, int size) {
    if (fgets(buffer, size, stdin) != NULL) {
        buffer[strcspn(buffer, "\n")] = '\0'; // 개행 문자 제거

        if (strlen(buffer) == size -1 && buffer[size - 2] != '\0') {
            while (getchar() != '\n'); // 입력 버퍼 비우기
        }
    }
}
```

&nbsp;&nbsp; 사용자로부터 문자열을 입력 받는 함수로 `fgets` 함수를 통해 입력을 받고 개행 문자를 제거한다. 만약 설정한 크기를 넘어선 문자열을 입력 받는다면 입력 버퍼를 비운다.

#### 아. isPhoneNumber()

```c
bool isPhoneNumber(const char* num) {
    if (strlen(num) != 13)
        return false;
    for (int i = 0; i < 13; i++) {
        if (i == 0 || i == 2) {
            if (num[i] != '0')
                return false;
        }
        else if (i == 1) {
            if (num[i] != '1')
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

&nbsp;&nbsp; 전화번호의 형식을 검사하는 함수로 전화번호의 길이가 13이 아니거나 010-0000-0000 형식이 아니면 유효하지 않은 전화번호로 판단하고 `false`를 반환한다.

<div class="bg"></div>

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
                printf("\n==================================================\n");
                addList(&list);
                break;
            case 2:
                printf("\n==================================================\n");
                deleteList(&list);
                break;
            case 3:
                printf("\n==================================================\n");
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

### i. 라이브러리 포함

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include "phonebook.h"
```

&nbsp;&nbsp; `_CRT_SECURE_NO_WARNINGS`는 `scanf` 함수를 사용할 때 발생하는 경고 메시지를 무시하기 위한 매크로이다. 표준 입출력, 동적 메모리 할당, 이전에 정의한 `phonebook.h` 헤더 파일을 포함시킨다.

### ii. main 함수

```c
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
                printf("\n==================================================\n");
                addList(&list);
                break;
            case 2:
                printf("\n==================================================\n");
                deleteList(&list);
                break;
            case 3:
                printf("\n==================================================\n");
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

&nbsp;&nbsp; `Phonebook` 구조체 포인터 `list`를 선언하고 `NULL`로 초기화한다. 사용자가 선택한 메뉴를 저장할 `sel` 변수도 선언한다. 무한 루프를 통해 전화번호부 프로그램을 실행하며 `switch-case 문`을 통해 사용자가 선택한 메뉴에 따라 각 함수를 호출한다. 사용자가 5번을 선택하면 프로그램을 종료하고 동적으로 할당된 메모리를 해제한 후 프로그램을 종료한다.

<div class="bg"></div>

# 2.3 프로그램 실행

## a. 컴파일

```bash
$ gcc -c phonebook.h
```

```bash
$ gcc -c phonebook.c
```

```bash
$ gcc -c main.c
```

```bash
$ gcc -o main phonebook.h phonebook.c main.o
```

## b. 실행

```bash
$ ./main
```

## c. 실행 결과

### i. 메뉴 출력

<img class="lazy" data-src="https://github.com/user-attachments/assets/e882921b-37f9-4e54-94e1-6b8f530c7c00#center" alt="image" height="75%" width="75%">

### ii. 전화번호 추가

<img class="lazy" data-src="https://github.com/user-attachments/assets/7dcee398-0704-4938-a357-51871168f65f#center" alt="image" height="75%" width="75%">

#### 가. 전화번호 유효성 검사

<img class="lazy" data-src="https://github.com/user-attachments/assets/76eb9c98-dc40-49b2-a561-6b70314dea28#center" alt="image" height="75%" width="75%">

#### 나. 중복 정보 추가

<img class="lazy" data-src="https://github.com/user-attachments/assets/e95a7100-5c16-4d48-b4de-e71127be2d9a#center" alt="image" height="75%" width="75%">

### iii. 전화번호 삭제

<img class="lazy" data-src="https://github.com/user-attachments/assets/c3bdf8c7-8f9c-40b5-8d58-2ec18a8e0b30#center" alt="image" height="75%" width="75%">

### iv. 전화번호 검색

<img class="lazy" data-src="https://github.com/user-attachments/assets/08df1bf9-d6e3-4dd2-b015-414d88bfca03#center" alt="image" height="75%" width="75%">

### v. 전화번호 나열

<img class="lazy" data-src="https://github.com/user-attachments/assets/5188d90c-9af3-4d50-9e8f-099bfe85ee65#center" alt="image" height="75%" width="75%">

# 2.4 결론

&nbsp;&nbsp; 이번 장에서는 Linux 환경에서 C 언어를 이용한 전화번호부를 개발해보았다. 이 프로그램은 삽입, 검색, 삭제, 리스트 기능을 제공하며 두 개 이상의 소스 파일로 분할하여 작성하였다. 또한 전화번호부는 연결 리스트로 구현하였기 때문에 동적으로 크기를 조절할 수 있고 삽입, 삭제 연산의 시간 복잡도가 O(1)이기 때문에 성능이 유지된다.

&nbsp;&nbsp; 더 추가하고 싶은 기능은 전화번호부를 정렬하는 것이다. 현재 전화번호부는 입력 순서대로 출력되기 때문에 이름을 기준으로 정렬하는 기능을 추가한다면 더욱 편리하게 사용할 수 있을 것이다. 또한 전화번호부를 파일로 저장하고 불러오는 기능도 추가하면 매번 프로그램을 실행할 때마다 정보를 다시 입력할 필요가 없어진다.

&nbsp;&nbsp; 이번 과제를 수행하며 C 언어의 문법을 복습할 수 있었다. 그 중에서도 더욱이 포인터와 구조체, 메모리 동적 할당, 연결 리스트를 다루며 C 언어의 중요한 개념을 학습하는 시간이 되었다. 또한 이 프로그램을 통해 프로그램 설계의 중요성을 깨달을 수 있었다. 물론 간단한 프로그램이었지만, 프로그램을 작성하기 전에 어떻게 정보를 저장할 것인지, 정보를 다루는 방식은 어떻게 할 것인지 등을 미리 계획하고 프로그램을 작성하니 훨씬 수월하였다.

---
**참고 문헌**

* 천인국, 『쉽게 풀어쓴 C언어 Express』, 생능출판사, 2018, 742~762쪽
