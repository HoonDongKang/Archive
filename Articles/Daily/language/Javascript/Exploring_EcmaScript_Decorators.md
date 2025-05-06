## Exploring EcmaScript Decorators

원문: [Exploring EcmaScript Decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)

### 데코레이터 패턴

파이썬에서 데코레이터는 다른 함수를 취하는 함수로, 후자에 있는 함수를 명시적으로 수정하지 않고 확장하는 기능을 갖는다.

```python
@mydecorator
def myfunc():
    pass
```

`@mydecorator`는 데코레이터이며 `@`는 데코레이터로 선언된 함수명을 파싱한다. 데코레이터는 추가 기능을 투명하게 래핑하려고 할 때 유용하게 사용된다. (메모이제이션, 인증, 로그 등)

### ES6에서 데코레이터

ES5에서는 명령형 함수 기반의 데코레이터를 직접 구현할 수 있었다. 클래스는 확장은 가능하지만, 여러 클래스에 공통 기능을 적용하기엔 더 좋은 분산(distribution) 방식이 필요하였다.

ES6에서는 선언형 문법을 통해 클래스, 메서드, 속성 등 함수에 붙여서 기능을 추가할 수 있는 데코레이터로 변화되었다.

#### property decorator

```js
function readonly(target, key, descriptor) {
    desriptor.writable = false;
    return descriptor
}

@readonly
meow() { return `${this.name} sass Meow!` };
```

`@readonly`라는 데코레이터를 만들어서 `meow()`함수에 적용하면 해당 메서드는 `readonly`상태를 유지

#### class decorator

```js
function superhero(target) {
    target.isSuperhero = true;
    target.power = "flight";
}

@superhero
class MySuperHero() {}

console.log(MySuperHero.isSuperher); // true
```

데코레이터에 인자를 전달하여 팩토리 패턴처럼 데코레이터 함수를 사용할 수 있다.

```js
function superhero(isSuperhero) {
    return function(target) {
        target.isSuperHero = isSuperHero;
    }
}

@superhero(true)
class MySuperHero() {}
console.log(MySuperHero.isSuperher); // true

@superhero(false)
class MySuperHero() {}
console.log(MySuperHero.isSuperher); // false
```
