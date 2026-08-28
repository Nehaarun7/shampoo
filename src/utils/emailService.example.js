import emailjs from "@emailjs/browser";

// Copy this file to emailService.js and fill in your credentials from emailjs.com
const SERVICE_ID  = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY  = "YOUR_PUBLIC_KEY";

export async function sendOrderConfirmation({ form, items, totalPrice }) {
  const orderId = `SS-${Date.now().toString(36).toUpperCase()}`;

  const itemList = items
    .map((i) => `${i.moodEmoji} ${i.name} x${i.qty}  —  Rs.${i.price * i.qty}`)
    .join("\n");

  const templateParams = {
    to_name:          form.name.split(" ")[0],
    to_email:         form.email,
    order_id:         orderId,
    order_items:      itemList,
    order_total:      `Rs.${totalPrice}`,
    shipping_address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
    order_date:       new Date().toLocaleDateString("en-IN", {
                        weekday: "long", year: "numeric",
                        month: "long",   day: "numeric",
                      }),
  };

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
  return orderId;
}
