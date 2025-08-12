"use server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import "./checkout.css";
import Link from "next/link";
import OrderForm from "@/components/order/OrderForm";
import OrderDetail from "@/components/order/OrderDetail";
import { getCart } from "@/utils/cart";
import { Product } from "@/utils/types";
import { submit } from "./actions";

export default async function Order() {
  // const [paymentMethod, setPaymentMethod] = useState("cod");
  
    
  async function subm(formdata) {
    "use server"
    submit(formdata,await getCart()) 
  }
    
  return (
    <div className="row min-h-screen max-w-screen p-5 gap-10">
    <OrderForm submt={subm}></OrderForm>

    <OrderDetail cartProp={await getCart()}></OrderDetail>

      {/* <div className="col-md-4">
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              defaultValue="cod"
              //onValueChange={setPaymentMethod}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod">Cash on Delivery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="online" />
                <Label
                  htmlFor="online"
                  className="line-through text-gray-400 cursor-not-allowed"
                >
                  Online Payment (Coming Soon)
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useState } from "react";

// export default function CheckoutPage() {
//   const [paymentMethod, setPaymentMethod] = useState("cod");

//   return (
//     <div className="w-[90vw] mx-auto p-4 space-y-6 min-h-full h-full">
//       <h1 className="text-3xl font-bold">Checkout</h1>
//       <div className="cont">
//         {/* Personal Information */}
//         <Card style={{ gridArea: "1 / 1 / 3 / 3" }}>
//           <CardHeader>
//             <CardTitle>Personal Details</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="fname">First Name</Label>
//                 <Input id="name" placeholder="Enter your full name" />
//               </div>
//               <div>
//                 <Label htmlFor="lname">Last Name</Label>
//                 <Input id="name" placeholder="Enter your full name" />
//               </div>
//               <div>
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <Input id="phone" placeholder="01XXXXXXXXX" />
//               </div>
//               <div className="md:col-span-2">
//                 <Label htmlFor="address">Shipping Address</Label>
//                 <Textarea id="address" placeholder="Enter your full address" />
//               </div>
//               <div>
//                 <Label htmlFor="city">City</Label>
//                 <Input id="city" placeholder="Enter your city" />
//               </div>
//               <div>
//                 <Label htmlFor="state">State/Province</Label>
//                 <Input id="state" placeholder="Enter your state/province" />
//               </div>
//               <div>
//                 <Label htmlFor="zip">Zip/Postal Code</Label>
//                 <Input id="zip" placeholder="Enter your zip/postal code" />
//               </div>
//               <div>
//                 <Label htmlFor="email">Email Address</Label>
//                 <Input id="email" placeholder="Enter your email address" />
//               </div>
//               <div className="md:col-span-2">
//                 <Button type="submit" formAction={()=>{}}>Submit</Button>
//               </div>

//             </form>
//           </CardContent>
//         </Card>

//         {/* Order Summary */}
//         <Card style={{ gridArea: "1 / 3 / 2 / 5" }}>
//           <CardHeader>
//             <CardTitle>Order Summary</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <div className="flex justify-between">
//               <span>Product A x1</span>
//               <span>৳500</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Product B x2</span>
//               <span>৳1000</span>
//             </div>
//             <div className="border-t pt-2 flex justify-between font-semibold">
//               <span>Total</span>
//               <span>৳1500</span>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Payment Method */}
//         <Card style={{ gridArea: "2 / 3 / 3 / 4" }}>
//           <CardHeader>
//             <CardTitle>Payment Method</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <RadioGroup
//               defaultValue="cod"
//               onValueChange={setPaymentMethod}
//               className="space-y-2"
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="cod" id="cod" />
//                 <Label htmlFor="cod">Cash on Delivery</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="online" id="online" />
//                 <Label
//                   htmlFor="online"
//                   className="line-through text-gray-400 cursor-not-allowed"
//                 >
//                   Online Payment (Coming Soon)
//                 </Label>
//               </div>
//             </RadioGroup>
//           </CardContent>
//         </Card>

//         {/* Place Order */}
//         <div className="text-right" style={{ gridArea: "2 / 4 / 3 / 5" }}>
//           <Button className="w-full md:w-auto">Place Order</Button>
//         </div>
//       </div>
//     </div>
//   );
// }
