import React from 'react';
import { Mail, MessageSquare, Twitter, Github, Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

export const Contact = () => (
    <div className="page-container">
        <SEO title="Contact Us" description="Get in touch with the Swaplinq support team. Available 24/7." />
        <header className="page-header">
            <Mail size={48} color="#00e676" />
            <h1>Contact Support</h1>
            <p>Our dedicated support team is available 24/7 to assist with any questions or issues.</p>
        </header>
        <section className="contact-grid section-content">
            <div className="contact-card glass">
                <Mail size={24} color="#00e676" />
                <h3>Email Us</h3>
                <p>support@swaplinq.exchange</p>
            </div>
            <div className="contact-card glass">
                <Twitter size={24} color="#2979ff" />
                <h3>Twitter DM</h3>
                <p>@SwaplinqExchange</p>
            </div>
            <div className="contact-card glass">
                <MessageSquare size={24} color="#ffb300" />
                <h3>Telegram</h3>
                <p>t.me/swaplinq_support</p>
            </div>
        </section>
    </div>
);

export const Blog = () => (
    <div className="page-container">
        <SEO title="Blog - Crypto Insights & Updates" description="Swaplinq Blog for the latest news and updates on crypto exchange trends." />
        <header className="page-header">
            <h1>Platform Blog</h1>
            <p>Your source for decentralized finance insights and Swaplinq product updates.</p>
        </header>
        <section className="blog-grid section-content">
            <div className="blog-post glass">
                <div className="post-date">March 20, 2026</div>
                <h3>Swaplinq V2 Launch: The Future is Here</h3>
                <p>Introducing our brand new multicore liquidity engine for faster, cheaper swaps across 350+ assets.</p>
                <div className="post-link">Read More</div>
            </div>
            <div className="blog-post glass">
                <div className="post-date">March 15, 2026</div>
                <h3>Understanding Fixed vs Floating Rates</h3>
                <p>A deep dive into how to protect your swaps from market volatility with fixed-rate exchanges.</p>
                <div className="post-link">Read More</div>
            </div>
        </section>
    </div>
);

