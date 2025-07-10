
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Search, Stethoscope, TrendingUp } from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
}

interface Diagnosis {
  condition: string;
  probability: number;
  severity: string;
  stage?: string;
  description: string;
  recommendations: string[];
}

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const commonSymptoms: Symptom[] = [
    { id: '1', name: 'Headache', severity: 'mild' },
    { id: '2', name: 'Fever', severity: 'moderate' },
    { id: '3', name: 'Cough', severity: 'mild' },
    { id: '4', name: 'Fatigue', severity: 'moderate' },
    { id: '5', name: 'Chest Pain', severity: 'severe' },
    { id: '6', name: 'Shortness of Breath', severity: 'severe' },
    { id: '7', name: 'Nausea', severity: 'mild' },
    { id: '8', name: 'Dizziness', severity: 'moderate' },
    { id: '9', name: 'Joint Pain', severity: 'moderate' },
    { id: '10', name: 'Skin Rash', severity: 'mild' },
  ];

  const filteredSymptoms = commonSymptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const analyzeSyntoms = async () => {
    if (selectedSymptoms.length === 0) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockDiagnosis: Diagnosis = {
        condition: selectedSymptoms.includes('2') && selectedSymptoms.includes('3') 
          ? 'Upper Respiratory Infection' 
          : selectedSymptoms.includes('5') 
          ? 'Cardiovascular Assessment Needed'
          : 'General Health Evaluation',
        probability: Math.floor(Math.random() * 30) + 70,
        severity: selectedSymptoms.some(id => commonSymptoms.find(s => s.id === id)?.severity === 'severe') 
          ? 'High' 
          : selectedSymptoms.some(id => commonSymptoms.find(s => s.id === id)?.severity === 'moderate') 
          ? 'Moderate' 
          : 'Low',
        stage: selectedSymptoms.length > 3 ? 'Stage 2 - Moderate' : 'Stage 1 - Mild',
        description: 'Based on your symptoms, this appears to be a common condition that can be managed with proper care.',
        recommendations: [
          'Consult with a healthcare professional',
          'Monitor symptoms for changes',
          'Stay hydrated and get adequate rest',
          'Consider dietary adjustments',
          'Regular exercise as tolerated'
        ]
      };
      
      setDiagnosis(mockDiagnosis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Symptom Checker</h2>
        <p className="text-gray-600">Describe your symptoms and get intelligent health insights</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search & Select Symptoms
          </CardTitle>
          <CardDescription>
            Search for symptoms you're experiencing and select all that apply
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Search symptoms (e.g., headache, fever, cough)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filteredSymptoms.map((symptom) => (
              <div
                key={symptom.id}
                className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50"
              >
                <Checkbox
                  id={symptom.id}
                  checked={selectedSymptoms.includes(symptom.id)}
                  onCheckedChange={() => handleSymptomToggle(symptom.id)}
                />
                <label
                  htmlFor={symptom.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                >
                  {symptom.name}
                </label>
                <Badge className={getSeverityColor(symptom.severity)}>
                  {symptom.severity}
                </Badge>
              </div>
            ))}
          </div>

          {selectedSymptoms.length > 0 && (
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''} selected
                </p>
                <Button 
                  onClick={analyzeSyntoms}
                  disabled={isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Analyze Symptoms
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {diagnosis && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <TrendingUp className="w-5 h-5" />
              Health Assessment Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">Possible Condition</h4>
                <p className="text-lg font-bold text-blue-600">{diagnosis.condition}</p>
                <p className="text-sm text-gray-600">{diagnosis.probability}% probability match</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">Risk Level</h4>
                <p className={`text-lg font-bold ${getRiskColor(diagnosis.severity)}`}>
                  {diagnosis.severity}
                </p>
                {diagnosis.stage && (
                  <p className="text-sm text-gray-600">{diagnosis.stage}</p>
                )}
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">Action Required</h4>
                <p className="text-lg font-bold text-orange-600">
                  {diagnosis.severity === 'High' ? 'Immediate' : 'Routine'}
                </p>
                <p className="text-sm text-gray-600">Medical consultation</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
              <p className="text-gray-700">{diagnosis.description}</p>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
              <ul className="space-y-2">
                {diagnosis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900">Medical Disclaimer</h4>
                  <p className="text-sm text-red-800">
                    This assessment is for informational purposes only and should not replace professional medical advice. 
                    Please consult with a qualified healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SymptomChecker;
