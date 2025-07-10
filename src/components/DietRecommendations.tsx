
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Apple, Utensils, Clock, Target, CheckCircle } from 'lucide-react';

interface NutritionPlan {
  name: string;
  description: string;
  calories: string;
  macros: {
    carbs: number;
    protein: number;
    fat: number;
  };
  benefits: string[];
  foods: {
    category: string;
    items: string[];
  }[];
  restrictions: string[];
}

const DietRecommendations = () => {
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [currentPlan, setCurrentPlan] = useState<NutritionPlan | null>(null);

  const healthConditions = [
    { value: 'diabetes', label: 'Diabetes Type 2' },
    { value: 'hypertension', label: 'High Blood Pressure' },
    { value: 'cholesterol', label: 'High Cholesterol' },
    { value: 'heart', label: 'Heart Disease' },
    { value: 'obesity', label: 'Obesity' },
    { value: 'arthritis', label: 'Arthritis' },
    { value: 'none', label: 'No Specific Condition' }
  ];

  const fitnessGoals = [
    { value: 'lose', label: 'Lose Weight' },
    { value: 'gain', label: 'Gain Weight' },
    { value: 'maintain', label: 'Maintain Weight' },
    { value: 'muscle', label: 'Build Muscle' },
    { value: 'endurance', label: 'Improve Endurance' }
  ];

  const dietPlans: Record<string, NutritionPlan> = {
    diabetes: {
      name: 'Diabetes-Friendly Diet',
      description: 'Low glycemic index foods to help manage blood sugar levels',
      calories: '1,800-2,000',
      macros: { carbs: 45, protein: 25, fat: 30 },
      benefits: [
        'Stabilizes blood sugar levels',
        'Reduces insulin resistance',
        'Supports heart health',
        'Promotes sustainable weight management'
      ],
      foods: [
        {
          category: 'Complex Carbs',
          items: ['Quinoa', 'Brown rice', 'Sweet potatoes', 'Oats', 'Legumes']
        },
        {
          category: 'Lean Proteins',
          items: ['Grilled chicken', 'Fish', 'Tofu', 'Eggs', 'Greek yogurt']
        },
        {
          category: 'Healthy Fats',
          items: ['Avocado', 'Nuts', 'Olive oil', 'Seeds', 'Fatty fish']
        },
        {
          category: 'Vegetables',
          items: ['Leafy greens', 'Broccoli', 'Bell peppers', 'Cauliflower', 'Zucchini']
        }
      ],
      restrictions: ['Refined sugars', 'White bread', 'Processed foods', 'Sugary drinks']
    },
    hypertension: {
      name: 'DASH Diet Plan',
      description: 'Dietary approaches to stop hypertension, rich in potassium and low in sodium',
      calories: '1,600-2,100',
      macros: { carbs: 55, protein: 20, fat: 25 },
      benefits: [
        'Lowers blood pressure naturally',
        'Reduces sodium intake',
        'Rich in heart-healthy nutrients',
        'Supports cardiovascular health'
      ],
      foods: [
        {
          category: 'Fruits',
          items: ['Bananas', 'Berries', 'Oranges', 'Melons', 'Apples']
        },
        {
          category: 'Vegetables',
          items: ['Spinach', 'Kale', 'Tomatoes', 'Carrots', 'Beets']
        },
        {
          category: 'Whole Grains',
          items: ['Brown rice', 'Whole wheat bread', 'Oatmeal', 'Quinoa']
        },
        {
          category: 'Low-fat Dairy',
          items: ['Skim milk', 'Greek yogurt', 'Low-fat cheese']
        }
      ],
      restrictions: ['High sodium foods', 'Processed meats', 'Canned soups', 'Fast food']
    },
    lose: {
      name: 'Weight Loss Plan',
      description: 'Calorie-controlled diet focused on nutrient-dense, filling foods',
      calories: '1,200-1,500',
      macros: { carbs: 40, protein: 30, fat: 30 },
      benefits: [
        'Creates sustainable calorie deficit',
        'Preserves lean muscle mass',
        'Boosts metabolism',
        'Reduces hunger and cravings'
      ],
      foods: [
        {
          category: 'Lean Proteins',
          items: ['Chicken breast', 'Turkey', 'Fish', 'Egg whites', 'Protein powder']
        },
        {
          category: 'Fibrous Vegetables',
          items: ['Broccoli', 'Spinach', 'Cabbage', 'Asparagus', 'Brussels sprouts']
        },
        {
          category: 'Complex Carbs',
          items: ['Oats', 'Sweet potato', 'Brown rice', 'Quinoa']
        },
        {
          category: 'Healthy Fats',
          items: ['Almonds', 'Olive oil', 'Avocado', 'Chia seeds']
        }
      ],
      restrictions: ['Processed foods', 'Sugary snacks', 'Refined carbs', 'High-calorie drinks']
    }
  };

  const generatePlan = () => {
    const key = selectedCondition === 'none' ? selectedGoal : selectedCondition;
    const plan = dietPlans[key];
    if (plan) {
      setCurrentPlan(plan);
    }
  };

  const getMacroColor = (macro: string) => {
    switch (macro) {
      case 'carbs': return 'bg-blue-500';
      case 'protein': return 'bg-green-500';
      case 'fat': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Personalized Diet Plans</h2>
        <p className="text-gray-600">Get customized nutrition recommendations based on your health condition and goals</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Health Assessment
          </CardTitle>
          <CardDescription>Tell us about your health condition and fitness goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Health Condition</label>
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger>
                  <SelectValue placeholder="Select health condition" />
                </SelectTrigger>
                <SelectContent>
                  {healthConditions.map((condition) => (
                    <SelectItem key={condition.value} value={condition.value}>
                      {condition.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Fitness Goal</label>
              <Select value={selectedGoal} onValueChange={setSelectedGoal}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fitness goal" />
                </SelectTrigger>
                <SelectContent>
                  {fitnessGoals.map((goal) => (
                    <SelectItem key={goal.value} value={goal.value}>
                      {goal.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={generatePlan}
            disabled={!selectedCondition || !selectedGoal}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <Apple className="w-4 h-4 mr-2" />
            Generate My Diet Plan
          </Button>
        </CardContent>
      </Card>

      {currentPlan && (
        <div className="space-y-6">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900">
                <Utensils className="w-5 h-5" />
                {currentPlan.name}
              </CardTitle>
              <CardDescription className="text-green-700">
                {currentPlan.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Daily Calories</h4>
                    <p className="text-2xl font-bold text-green-600">{currentPlan.calories}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Macronutrient Split</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Carbohydrates</span>
                        <span className="text-sm font-medium">{currentPlan.macros.carbs}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${currentPlan.macros.carbs}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Protein</span>
                        <span className="text-sm font-medium">{currentPlan.macros.protein}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${currentPlan.macros.protein}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Fats</span>
                        <span className="text-sm font-medium">{currentPlan.macros.fat}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${currentPlan.macros.fat}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Benefits</h4>
                  <ul className="space-y-2">
                    {currentPlan.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="foods" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="foods">Recommended Foods</TabsTrigger>
              <TabsTrigger value="restrictions">Foods to Limit</TabsTrigger>
            </TabsList>
            
            <TabsContent value="foods" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentPlan.foods.map((category, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((item, itemIndex) => (
                          <Badge key={itemIndex} variant="secondary" className="bg-green-100 text-green-800">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="restrictions">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-red-700">Foods to Limit or Avoid</CardTitle>
                  <CardDescription>
                    These foods may interfere with your health goals or condition management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {currentPlan.restrictions.map((restriction, index) => (
                      <Badge key={index} variant="destructive" className="bg-red-100 text-red-800">
                        {restriction}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Implementation Tips</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Start gradually - introduce new foods slowly over 1-2 weeks</li>
                    <li>• Stay hydrated - aim for 8-10 glasses of water daily</li>
                    <li>• Plan your meals in advance to stay consistent</li>
                    <li>• Monitor your progress and adjust portions as needed</li>
                    <li>• Consult with a registered dietitian for personalized guidance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DietRecommendations;
