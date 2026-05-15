const WHATSAPP_NUMBER = "18090000000";

export function buildProductWhatsAppUrl(product) {
  const message = `Hola, quiero consultar disponibilidad del producto: ${product.name} (ID ${product.id}).`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
