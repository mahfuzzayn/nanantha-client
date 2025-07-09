import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Metadata } from "next";
import orangeGradientBg from "@/assets/images/orange-gradient-bg.jpg";

export const metadata: Metadata = {
    title: "FAQ ‣ Nanantha",
    description:
        "Have questions about shopping at Nanantha? Check out our frequently asked questions for quick help on orders, payments, shipping, and more.",
};

const faqData = [
    {
        category: "Shopping",
        questions: [
            {
                question: "How do I find a book?",
                answer: "You can browse by category, use the search bar, or check out our curated collections like 'New Arrivals' and 'Bestsellers' on the homepage.",
            },
            {
                question: "Can I pre-order upcoming books?",
                answer: "Yes, if a book is available for pre-order, you'll see a 'Pre-order' button on the product page. You’ll be notified when it ships.",
            },
        ],
    },
    {
        category: "Payments",
        questions: [
            {
                question: "How are payments processed?",
                answer: "Payments are securely processed through Mollie, supporting major payment methods like cards, iDeal, PayPal, and more.",
            },
            {
                question: "Are refunds available?",
                answer: "Yes, we offer refunds for damaged or incorrect items. Please contact us within 7 days of delivery to request a return or refund.",
            },
        ],
    },
    {
        category: "Account Management",
        questions: [
            {
                question: "How can I manage my wishlist or orders?",
                answer: "Log in to your account and go to the dashboard to view your orders, manage your wishlist, and track shipping status.",
            },
            {
                question: "Can I update my shipping address?",
                answer: "Yes, you can update your address anytime before placing an order. For active orders, contact our support team for help.",
            },
        ],
    },
];

const faqPage = () => {
    return (
        <div className="max-w-6xl mx-auto pt-24 pb-24 px-5">
            <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-12 text-center">
                Frequently Asked Questions
            </h1>
            <div className="mt-10">
                {faqData.map((category, categoryIndex) => (
                    <div
                        key={categoryIndex}
                        className="mb-8 p-6 rounded-md border-[1px] border-[#fffff367]"
                        style={{
                            backgroundImage: `url('${orangeGradientBg.src}')`,
                        }}
                    >
                        <h2 className="text-2xl text-it-secondary font-bold mb-4">
                            {category.category}
                        </h2>
                        <Accordion type="single" collapsible>
                            {category.questions.map((item, questionIndex) => (
                                <AccordionItem
                                    key={questionIndex}
                                    value={`${categoryIndex}-${questionIndex}`}
                                >
                                    <AccordionTrigger className="text-left">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default faqPage;
