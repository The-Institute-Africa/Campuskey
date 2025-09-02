
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import StepByStepGuide from '@/components/student-guide/StepByStepGuide';
import SafetyTips from '@/components/student-guide/SafetyTips';
import BudgetGuide from '@/components/student-guide/BudgetGuide';
import UniversityAreasGuide from '@/components/student-guide/UniversityAreasGuide';
import QuickTips from '@/components/student-guide/QuickTips';
import CtaSection from '@/components/student-guide/CtaSection';

const StudentGuidePage = () => {
  return (
    <>
      <Helmet>
        <title>Student Accommodation Guide - Campus Key Zimbabwe</title>
        <meta name="description" content="Complete guide to finding student accommodation in Zimbabwe. Learn how to search, verify properties, budget effectively, and stay safe while finding your perfect student home." />
        <meta property="og:title" content="Student Accommodation Guide - Campus Key Zimbabwe" />
        <meta property="og:description" content="Complete guide to finding student accommodation in Zimbabwe. Learn how to search, verify properties, budget effectively, and stay safe while finding your perfect student home." />
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <section className="campus-hero-bg py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Student Accommodation Guide
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              Everything you need to know about finding safe, affordable student accommodation in Zimbabwe
            </motion.p>
          </div>
        </section>

        <StepByStepGuide />
        <SafetyTips />
        <BudgetGuide />
        <UniversityAreasGuide />
        <QuickTips />
        <CtaSection />

        <Footer />
      </div>
    </>
  );
};

export default StudentGuidePage;
