
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Stethoscope, Apple, Dumbbell, BarChart3 } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'symptoms', label: 'Symptom Checker', icon: Stethoscope },
    { id: 'diet', label: 'Diet Plans', icon: Apple },
    { id: 'workout', label: 'Workout Plans', icon: Dumbbell },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">HealthAI</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  onClick={() => onTabChange(item.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => onTabChange(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
