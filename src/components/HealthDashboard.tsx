
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Activity, Utensils, Dumbbell, AlertCircle, TrendingUp } from 'lucide-react';

interface HealthMetric {
  label: string;
  value: number;
  status: 'good' | 'warning' | 'danger';
  unit: string;
}

const HealthDashboard = () => {
  const [healthMetrics] = useState<HealthMetric[]>([
    { label: 'BMI', value: 24.5, status: 'good', unit: 'kg/m²' },
    { label: 'Blood Pressure', value: 120, status: 'good', unit: 'mmHg' },
    { label: 'Heart Rate', value: 72, status: 'good', unit: 'bpm' },
    { label: 'Cholesterol', value: 180, status: 'warning', unit: 'mg/dL' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'danger': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'danger': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Health Dashboard</h2>
        <p className="text-gray-600">Monitor your health metrics and track your progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.label}
                </CardTitle>
                <Badge className={getStatusBadge(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {metric.value} <span className="text-sm text-gray-500">{metric.unit}</span>
              </div>
              <Progress 
                value={metric.status === 'good' ? 80 : metric.status === 'warning' ? 60 : 30} 
                className="mt-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Health Trends
            </CardTitle>
            <CardDescription>Your health progress over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Weight Loss Progress</span>
                <span className="text-sm font-medium text-green-600">-2.5 kg</span>
              </div>
              <Progress value={75} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Fitness Goal</span>
                <span className="text-sm font-medium text-blue-600">60% Complete</span>
              </div>
              <Progress value={60} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Nutrition Score</span>
                <span className="text-sm font-medium text-orange-600">Good</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Health Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">Cholesterol levels slightly elevated</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">Time for your monthly check-up</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">Great progress on fitness goals!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-2" />
            <CardTitle>Health Assessment</CardTitle>
            <CardDescription>Complete health evaluation</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Utensils className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <CardTitle>Diet Plan</CardTitle>
            <CardDescription>Personalized nutrition guide</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Dumbbell className="w-12 h-12 text-blue-500 mx-auto mb-2" />
            <CardTitle>Workout Plan</CardTitle>
            <CardDescription>Custom fitness routine</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default HealthDashboard;
