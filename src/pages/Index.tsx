
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import LandingPage from '@/components/LandingPage';
import HealthDashboard from '@/components/HealthDashboard';
import HealthInputForm from '@/components/HealthInputForm';
import SymptomChecker from '@/components/SymptomChecker';
import DietRecommendations from '@/components/DietRecommendations';
import WorkoutPlanner from '@/components/WorkoutPlanner';

const Index = () => {
  const [activeTab, setActiveTab] = useState('landing');

  const renderContent = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage onGetStarted={() => setActiveTab('dashboard')} />;
      case 'dashboard':
        return <HealthDashboard />;
      case 'assessment':
        return <HealthInputForm />;
      case 'symptoms':
        return <SymptomChecker />;
      case 'diet':
        return <DietRecommendations />;
      case 'workout':
        return <WorkoutPlanner />;
      default:
        return <LandingPage onGetStarted={() => setActiveTab('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {activeTab !== 'landing' && (
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      )}
      
      <main className={activeTab === 'landing' ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}>
        {renderContent()}
      </main>
      
      {activeTab !== 'landing' && (
        <footer className="bg-white border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">
                <strong>Medical Disclaimer:</strong> This platform is for informational purposes only and should not replace professional medical advice.
              </p>
              <p className="text-sm">
                Always consult with qualified healthcare providers for diagnosis, treatment, and medical decisions.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Index;
