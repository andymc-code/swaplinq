import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const HOME_FAQS = [
    {
        question: "Do I really need absolutely no account or ID?",
        answer: "Yes. Swaplinq is a strict non-KYC, non-custodial exchange. You will never be asked to provide identifying documents, email addresses, or phone numbers to swap your assets. We believe privacy is a fundamental human right."
    },
    {
        question: "How long does a typical swap take to complete?",
        answer: "Most swaps are completed within 2 to 10 minutes. The exact duration depends entirely on the block time and network congestion of the specific blockchains you are trading across. Once your sent deposit receives the required confirmations, our smart routing engine instantly executes the trade and dispatches your requested asset."
    },
    {
        question: "Are there any maximum trading limits?",
        answer: "No. Since we do not employ traditional custodial accounts, there are no tiered verification limits. You can execute swaps of virtually any size, limited only by the instantaneous liquidity available across our aggregate provider network."
    },
    {
        question: "What happens if I send the wrong amount or the swap fails?",
        answer: "Our system employs precise auto-refund parameters. If your deposit underpays the required network fees, or if extreme volatility causes a rate failure before execution, your exact deposited funds are automatically routed back to your original sending address. You are never left in limbo."
    },
    {
        question: "Is my transaction completely untraceable?",
        answer: "Swaplinq does not store user IP addresses, browser fingerprints, or transaction histories. We function as a blind router. However, please remember that the underlying blockchains (like Bitcoin or Ethereum) are public ledgers. For absolute anonymity, we recommend utilizing privacy coins like Monero (XMR) on one side of your swap."
    }
];

const HomeFAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="home-faq-section" id="faq">
            <div className="section-head">
                <span className="badge-pill">KNOWLEDGE BASE</span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Frequently Asked <span>Questions.</span>
                </motion.h2>
                <p className="section-subtitle">
                    Everything you need to know about anonymous, limitless asset exchange.
                </p>
            </div>

            <div className="faq-accordion">
                {HOME_FAQS.map((faq, i) => (
                    <motion.div 
                        key={i} 
                        className={`faq-item glass ${openIndex === i ? 'open' : ''}`}
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="faq-question">
                            <h4>{faq.question}</h4>
                            <div className="faq-toggle">
                                {openIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                        </div>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div 
                                    className="faq-answer-wrapper"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div className="faq-answer">
                                        <p>{faq.answer}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HomeFAQSection;
