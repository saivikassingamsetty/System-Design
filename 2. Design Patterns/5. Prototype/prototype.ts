// // Prototype
// class Prototype {
//     public primitive: any;
//     public component: object;
//     public circularReference: ComponentWithBackReference;

//     public clone(): this {
//         const clone = Object.create(this);
//         clone.component = Object.create(this.component);
//         //circulare reference shouldn't point to the original object
//         clone.circularReference = {
//             ...this.circularReference,
//             prototype: { ...this }
//         }

//         return clone;
//     }
// }

// class ComponentWithBackReference {
//     public prototype: Prototype;

//     constructor(prototype: Prototype) {
//         this.prototype = prototype;
//     }
// }

// // Client code
// const proto1 = new Prototype();
// proto1.primitive = 333;
// proto1.component = new Date();
// proto1.circularReference = new ComponentWithBackReference(proto1);

// const proto2 = proto1.clone();

// if (proto1.primitive === proto2.primitive) {
//     console.log('Primitive field values have been carried over to a clone. Yay!');
// } else {
//     console.log('Primitive field values have not been copied. Booo!');
// }
// if (proto1.component === proto2.component) {
//     console.log('Simple component has not been cloned. Booo!');
// } else {
//     console.log('Simple component has been cloned. Yay!');
// }

// if (proto1.circularReference === proto2.circularReference) {
//     console.log('Component with back reference has not been cloned. Booo!');
// } else {
//     console.log('Component with back reference has been cloned. Yay!');
// }

// if (proto1.circularReference.prototype === proto2.circularReference.prototype) {
//     console.log('Component with back reference is linked to original object. Booo!');
// } else {
//     console.log('Component with back reference is linked to the clone. Yay!');
// }
