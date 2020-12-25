# Typescript Tricks
I love Typescript, and I won't be made to feel bad about that. Honestly, if you haven't tried Typescript in your project, you really should. Here are two (maybe more in the future) patterns that I like to do in Typescript that you might find useful.

## 1. Easy Hash Routing

When I write one page apps (such as this one you're on right now) I like to add that fashionable routing using the URL hash thing. But, no, you don't need to download a router from npm, you can do it yourself using:

```typescript
window.addEventListener('hashchange',() => {
  const nHash = window.location.hash.slice(1);
  switch(nHash) {
    case 'route1':
      // set page
    case 'route2':
      // set other page
    default:
      // 0 page
  }
});

if (window.location.hash !== ''){
  window.dispatchEvent(new CustomEvent('hashchange'));
}
```

in whatever function runs on DOM load is basically all you need to control your app with hash routing. This gives you a lot of stuff for free like your app being resilient under refresh and the back button working as expected. Also switching between pages is easier for you because any user input just needs to set the location hash correctly.

I'd really recommend trying this if you need this functionality.

## 2. The Flick

If you have some class that has all of its properties set by a form, or some other user input than you can try "flicking" it into a variable using promises.

```typescript
class Foo {
  prop1: string;
  prop2: number;
  constructor(prop1: string, prop2: number){
    this.prop1 = prop1;
    this.prop2 = prop2;
  }

  public static async form(home: Element): Promise<Foo> {
    const out = document.createElement('div');
    const form: HTMLFormElement = document.createElement('form');

    const p1_in: HTMLInputElement = document.createElement('input');
    p1_in.type = 'text';
    p1_in.id = 'prop1';
    p1_in.required = true;

    const p2_in: HTMLInputElement = document.createElement('input');
    p2_in.type = 'number';
    p2_in.id = 'prop2';
    p2_in.required = true;

    const sbtn: HTMLInputElement = document.createElement('input');
    sbtn.type = 'submit';

    form.append(p1_in,p2_in,sbtn);
    out.append(form);
    home.firstElementChild.replaceWith(out);

    return new Promise((resolve,reject) => {
      form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const foo = new Foo(p1_in.value,p2_in.valueAsNumber);
        resolve(foo);
    });
  }
}

let foo_inst = await Foo.form(document.getElementById('where_the_form_goes'));
```

This gives you the class instance when the form submits. You can obviously use `.then((foo_inst: Foo) => {})` as well. Also, you can reject on various issues (making all inputs required will stop the submit event from firing if the user skips any of them, saving you one rejection).

Some things to keep in mind is that the promise won't cause anything to hang, but it may throw some things out of whack if the user never submits the form. I try to save this pattern for things where the form is created on a user input, such as a ui element with a class backing it that the user has chosen to open. It also works for things like login forms where if the user never submits then they don't get access to the app anyway, so who cares if it breaks something?

## Conclusion

I hope you can find some use in either of these patterns. Even if you can't I hope you try out Typescript if you haven't! Let me know on GitHub of any of your favorite Typescript tricks and patterns!
