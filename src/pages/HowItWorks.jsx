import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Plus, Minus, ArrowRight, Settings, Send, CheckCircle, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';


const Step = ({ index, title, text, icon }) => {
    return (
        <motion.div 
            className="step-card glass"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className="step-icon">
                {icon}
            </div>
            <div className="step-content">
                <span className="step-number">Step 0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </motion.div>
    );
};

const HowItWorks = () => {


    const steps = [
        {
            title: "Select Your Pair",
            text: "Choose the cryptocurrency you want to exchange and the asset you'd like to receive. Enter the amount to see an instant estimate.",
            icon: <Settings size={20} />,
            color: "emerald"
        },
        {
            title: "Enter Your Address",
            text: "Provide the recipient's wallet address for the asset you want to receive. This is where your coins will be sent after the swap.",
            icon: <ArrowRight size={20} />,
            color: "blue"
        },
        {
            title: "Send Your Coins",
            text: "Send the exact amount of the original asset to the deposit address provided by Swaplinq. We handle the rest.",
            icon: <Send size={20} />,
            color: "gold"
        },
        {
            title: "Receive Your Assets",
            text: "Our smart routing system swaps your coins at the best rate and sends them directly to your wallet in minutes.",
            icon: <CheckCircle size={20} />,
            color: "cyan"
        }
    ];

    return (
        <div className="page-container">
            <SEO 
                title="How it Works - Instant Swap Tutorial" 
                description="A step-by-step guide on how to use Swaplinq for instant, non-custodial crypto exchanges." 
            />
            


            <header className="page-header">
                <span className="badge-pill">PROCESS GUIDE</span>
                <h1>Simple. <span>Fast.</span> Secure.</h1>
                <p>Learn how to swap your assets in four simple steps without ever creating an account.</p>
            </header>

            <section className="steps-grid">
                {steps.map((step, i) => (
                    <motion.div 
                        key={i}
                        className="premium-card"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className={`glow-icon ${step.color}`}>{step.icon}</div>
                        <span className="step-pill">STEP 0{i + 1}</span>
                        <h3>{step.title}</h3>
                        <p>{step.text}</p>
                    </motion.div>
                ))}
            </section>
        </div>
    );
};

export default HowItWorks;
