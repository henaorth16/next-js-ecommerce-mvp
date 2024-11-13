import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";
import logo from "../../public/asset/logo.png"
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `${process.env.NEXT_PUBLIC_URL}`;

type propTypes = {
  product: {
    id: string,
    name: string,
    priceInCents: number,
    imagePath: string,
    description: string,
    isAvailableForPurchase: boolean,
  }
  username: string
}

export const PurchaseReceiptEmail = ({ product, username }: propTypes) => (
  <Html>
    <Head />
    <Preview>Get your order summary, estimated delivery date, and more</Preview>
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="my-4 w-full max-w-lg mx-auto border border-gray-300">
          <Section className="px-10 py-6 bg-gray-100">
            <Row>
              <Column>
                <Text className="font-bold text-base leading-relaxed">Tracking Number</Text>
                <Text className="mt-3 font-medium text-sm text-gray-600 leading-snug">1ZV218970300071628</Text>
              </Column>
              <Column align="right"></Column>
            </Row>
          </Section>
          <Hr className="border-gray-200 m-0" />
          <Section className="px-20 py-10 text-center">
            <Img
              src="../../public/asset/logo.png"
              width="66"
              height="22"
              alt="Sol Habesha"
              className="mx-auto"
            />
            <Heading className="text-2xl font-bold text-center leading-tight tracking-tight">It's On Its Way.</Heading>
            <Text className="text-gray-600 font-medium mt-6">
              Your order's on its way. Use the link above to track its progress.
            </Text>
            <Text className="text-gray-600 font-medium mt-6">
              We’ve also charged your payment method for the cost of your order
              and will be removing any authorization holds.
            </Text>
          </Section>
          <Hr className="border-gray-200 m-0" />
          <Section className="px-10 py-6">
            <Text className="font-bold text-base">Shipping to: {username}</Text>
            <Text className="text-gray-600 text-sm mt-1">
              your Phone: { }
            </Text>
          </Section>
          <Hr className="border-gray-200 m-0" />
          <Section className="px-10 py-10">
            <Row>
              <Column>
                <Img
                  src={product.imagePath}
                  alt="Addis Ababa, Merkato"
                  className="float-left w-64"
                />
              </Column>
              <Column className="pt-3 pl-3">
                <Text className="font-medium leading-snug">{product.description}</Text>
                <Text className="text-gray-600">Size All </Text>
              </Column>
            </Row>
          </Section>
          <Hr className="border-gray-200 m-0" />
          <Section className="px-10 py-6">
            <Row className="inline-flex mb-10">
              <Column className="w-40">
                <Text className="font-bold text-base leading-relaxed">Order Number</Text>
                <Text className="mt-3 font-medium text-gray-600 leading-snug">C0106373851</Text>
              </Column>
              <Column>
                <Text className="font-bold text-base leading-relaxed">Order Date</Text>
                <Text className="mt-3 font-medium text-gray-600 leading-snug">Sep 22, 2022</Text>
              </Column>
            </Row>
            <Row>
              <Column align="center">
                <Link className="block w-56 text-center font-medium text-black border border-gray-400 px-4 py-2">
                  Order Status
                </Link>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default PurchaseReceiptEmail;
