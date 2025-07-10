
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Activity, Thermometer, Droplets } from 'lucide-react';

interface HealthData {
  bloodPressureSystolic: string;
  bloodPressureDiastolic: string;
  heartRate: string;
  temperature: string;
  weight: string;
  height: string;
  age: string;
  gender: string;
}

interface HealthAnalysis {
  bmi: number;
  bmiCategory: string;
  bloodPressureCategory: string;
  heartRateCategory: string;
  overallRisk: 'Low' | 'Moderate' | 'High';
  recommendations: string[];
}

const HealthInputForm = () => {
  const [healthData, setHealthData] = useState<HealthData>({
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    heartRate: '',
    temperature: '',
    weight: '',
    height: '',
    age: '',
    gender: ''
  });

  const [analysis, setAnalysis] = useState<HealthAnalysis | null>(null);

  const analyzeHealth = (): HealthAnalysis => {
    const weight = parseFloat(healthData.weight);
    const height = parseFloat(healthData.height) / 100; // convert cm to m
    const systolic = parseInt(healthData.bloodPressureSystolic);
    const diastolic = parseInt(healthData.bloodPressureDiastolic);
    const heartRate = parseInt(healthData.heartRate);
    const age = parseInt(healthData.age);

    // Calculate BMI
    const bmi = weight / (height * height);
    
    // Determine BMI category
    let bmiCategory = '';
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi < 25) bmiCategory = 'Normal';
    else if (bmi < 30) bmiCategory = 'Overweight';
    else bmiCategory = 'Obese';

    // Determine blood pressure category
    let bloodPressureCategory = '';
    if (systolic < 120 && diastolic < 80) bloodPressureCategory = 'Normal';
    else if (systolic < 130 && diastolic < 80) bloodPressureCategory = 'Elevated';
    else if (systolic < 140 || diastolic < 90) bloodPressureCategory = 'Stage 1 Hypertension';
    else bloodPressureCategory = 'Stage 2 Hypertension';

    // Determine heart rate category
    let heartRateCategory = '';
    if (heartRate < 60) heartRateCategory = 'Low (Bradycardia)';
    else if (heartRate <= 100) heartRateCategory = 'Normal';
    else heartRateCategory = 'High (Tachycardia)';

    // Determine overall risk
    let overallRisk: 'Low' | 'Moderate' | 'High' = 'Low';
    let riskFactors = 0;
    
    if (bmi >= 30) riskFactors++;
    if (systolic >= 140 || diastolic >= 90) riskFactors++;
    if (heartRate > 100 || heartRate < 60) riskFactors++;
    if (age > 65) riskFactors++;

    if (riskFactors >= 3) overallRisk = 'High';
    else if (riskFactors >= 1) overallRisk = 'Moderate';

    // Generate recommendations
    const recommendations = [];
    if (bmi >= 25) recommendations.push('Consider weight management through diet and exercise');
    if (systolic >= 130) recommendations.push('Monitor blood pressure regularly and consider lifestyle changes');
    if (heartRate > 100) recommendations.push('Consult a doctor about elevated heart rate');
    if (bmi < 18.5) recommendations.push('Consider gaining weight through healthy nutrition');
    recommendations.push('Maintain regular physical activity');
    recommendations.push('Follow a balanced diet rich in fruits and vegetables');

    return {
      bmi,
      bmiCategory,
      bloodPressureCategory,
      heartRateCategory,
      overallRisk,
      recommendations
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = analyzeHealth();
    setAnalysis(result);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    if (category.includes('Normal')) return 'text-green-600 bg-green-100';
    if (category.includes('Elevated') || category.includes('Overweight')) return 'text-yellow-600 bg-yellow-100';
    if (category.includes('Hypertension') || category.includes('Obese') || category.includes('High') || category.includes('Low')) return 'text-red-600 bg-red-100';
    return 'text-blue-600 bg-blue-100';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Health Assessment</h2>
        <p className="text-gray-600">Enter your health data for personalized analysis</p>
      </div>

      {!analysis ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Health Information
            </CardTitle>
            <CardDescription>Please provide your current health measurements</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="systolic">Blood Pressure - Systolic (mmHg)</Label>
                  <Input
                    id="systolic"
                    type="number"
                    placeholder="e.g., 120"
                    value={healthData.bloodPressureSystolic}
                    onChange={(e) => setHealthData({...healthData, bloodPressureSystolic: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="diastolic">Blood Pressure - Diastolic (mmHg)</Label>
                  <Input
                    id="diastolic"
                    type="number"
                    placeholder="e.g., 80"
                    value={healthData.bloodPressureDiastolic}
                    onChange={(e) => setHealthData({...healthData, bloodPressureDiastolic: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                  <Input
                    id="heartRate"
                    type="number"
                    placeholder="e.g., 72"
                    value={healthData.heartRate}
                    onChange={(e) => setHealthData({...healthData, heartRate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 36.5"
                    value={healthData.temperature}
                    onChange={(e) => setHealthData({...healthData, temperature: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="e.g., 70"
                    value={healthData.weight}
                    onChange={(e) => setHealthData({...healthData, weight: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="e.g., 175"
                    value={healthData.height}
                    onChange={(e) => setHealthData({...healthData, height: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g., 30"
                    value={healthData.age}
                    onChange={(e) => setHealthData({...healthData, age: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    value={healthData.gender}
                    onChange={(e) => setHealthData({...healthData, gender: e.target.value})}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Analyze My Health
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Health Analysis Results
              </CardTitle>
              <CardDescription>Based on your provided health data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">BMI</span>
                    <Badge className={getCategoryColor(analysis.bmiCategory)}>
                      {analysis.bmi.toFixed(1)} - {analysis.bmiCategory}
                    </Badge>
                  </div>
                  <Progress value={Math.min((analysis.bmi / 40) * 100, 100)} />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Blood Pressure</span>
                    <Badge className={getCategoryColor(analysis.bloodPressureCategory)}>
                      {analysis.bloodPressureCategory}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Heart Rate</span>
                    <Badge className={getCategoryColor(analysis.heartRateCategory)}>
                      {analysis.heartRateCategory}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2">Overall Risk Level</div>
                    <Badge className={`text-lg px-4 py-2 ${getRiskColor(analysis.overallRisk)}`}>
                      {analysis.overallRisk}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Health Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Button 
            onClick={() => setAnalysis(null)} 
            variant="outline" 
            className="w-full"
          >
            Enter New Data
          </Button>
        </div>
      )}
    </div>
  );
};

export default HealthInputForm;
