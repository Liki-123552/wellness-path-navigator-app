
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dumbbell, Clock, Target, Zap, PlayCircle, CheckCircle } from 'lucide-react';

interface Exercise {
  name: string;
  duration: string;
  sets?: string;
  reps?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string[];
  benefits: string[];
}

interface WorkoutPlan {
  name: string;
  description: string;
  duration: string;
  frequency: string;
  days: {
    day: string;
    focus: string;
    exercises: Exercise[];
  }[];
  tips: string[];
}

const WorkoutPlanner = () => {
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [fitnessLevel, setFitnessLevel] = useState<string>('');
  const [timeAvailable, setTimeAvailable] = useState<string>('');
  const [currentPlan, setCurrentPlan] = useState<WorkoutPlan | null>(null);

  const healthConditions = [
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'heart', label: 'Heart Disease' },
    { value: 'arthritis', label: 'Arthritis' },
    { value: 'back', label: 'Back Pain' },
    { value: 'obesity', label: 'Obesity' },
    { value: 'healthy', label: 'Generally Healthy' }
  ];

  const fitnessLevels = [
    { value: 'beginner', label: 'Beginner (0-6 months)' },
    { value: 'intermediate', label: 'Intermediate (6-24 months)' },
    { value: 'advanced', label: 'Advanced (2+ years)' }
  ];

  const timeOptions = [
    { value: '15', label: '15-20 minutes' },
    { value: '30', label: '30-45 minutes' },
    { value: '60', label: '60+ minutes' }
  ];

  const workoutPlans: Record<string, WorkoutPlan> = {
    diabetes: {
      name: 'Diabetes Management Workout',
      description: 'Low-impact cardio and strength training to improve insulin sensitivity',
      duration: '30-45 minutes',
      frequency: '4-5 days per week',
      days: [
        {
          day: 'Monday & Thursday',
          focus: 'Cardio + Upper Body',
          exercises: [
            {
              name: 'Brisk Walking',
              duration: '15-20 minutes',
              difficulty: 'beginner',
              equipment: ['None'],
              benefits: ['Improves insulin sensitivity', 'Burns glucose', 'Low impact']
            },
            {
              name: 'Wall Push-ups',
              sets: '2-3',
              reps: '8-12',
              difficulty: 'beginner',
              equipment: ['Wall'],
              benefits: ['Builds upper body strength', 'Easy on joints']
            },
            {
              name: 'Seated Rows',
              sets: '2-3',
              reps: '10-15',
              difficulty: 'beginner',
              equipment: ['Resistance band'],
              benefits: ['Strengthens back muscles', 'Improves posture']
            }
          ]
        },
        {
          day: 'Tuesday & Friday',
          focus: 'Lower Body + Core',
          exercises: [
            {
              name: 'Chair Squats',
              sets: '2-3',
              reps: '8-12',
              difficulty: 'beginner',
              equipment: ['Chair'],
              benefits: ['Strengthens legs', 'Improves balance', 'Functional movement']
            },
            {
              name: 'Modified Planks',
              duration: '20-30 seconds',
              sets: '2-3',
              difficulty: 'beginner',
              equipment: ['None'],
              benefits: ['Core stability', 'Improves posture']
            }
          ]
        }
      ],
      tips: [
        'Monitor blood sugar before and after exercise',
        'Keep glucose tablets nearby during workouts',
        'Stay hydrated throughout your session',
        'Start slowly and gradually increase intensity'
      ]
    },
    heart: {
      name: 'Heart-Healthy Cardio Plan',
      description: 'Gentle cardiovascular exercises to strengthen the heart safely',
      duration: '20-40 minutes',
      frequency: '5-6 days per week',
      days: [
        {
          day: 'Daily Options',
          focus: 'Low-Impact Cardio',
          exercises: [
            {
              name: 'Walking',
              duration: '20-30 minutes',
              difficulty: 'beginner',
              equipment: ['None'],
              benefits: ['Improves heart health', 'Low impact', 'Accessible anywhere']
            },
            {
              name: 'Swimming',
              duration: '15-25 minutes',
              difficulty: 'intermediate',
              equipment: ['Pool'],
              benefits: ['Full body workout', 'Joint-friendly', 'Excellent cardio']
            },
            {
              name: 'Stationary Cycling',
              duration: '15-30 minutes',
              difficulty: 'beginner',
              equipment: ['Exercise bike'],
              benefits: ['Heart strengthening', 'Leg muscle development', 'Low impact']
            }
          ]
        }
      ],
      tips: [
        'Start with 5-10 minutes and gradually increase',
        'Monitor heart rate - stay in target zone',
        'Stop if you feel chest pain or shortness of breath',
        'Warm up and cool down properly'
      ]
    },
    healthy: {
      name: 'Complete Fitness Program',
      description: 'Balanced strength, cardio, and flexibility training for overall health',
      duration: '45-60 minutes',
      frequency: '4-6 days per week',
      days: [
        {
          day: 'Monday & Thursday',
          focus: 'Upper Body Strength',
          exercises: [
            {
              name: 'Push-ups',
              sets: '3-4',
              reps: '8-15',
              difficulty: 'intermediate',
              equipment: ['None'],
              benefits: ['Chest and arm strength', 'Core stability']
            },
            {
              name: 'Pull-ups/Lat Pulldowns',
              sets: '3-4',
              reps: '6-12',
              difficulty: 'intermediate',
              equipment: ['Pull-up bar or gym'],
              benefits: ['Back and bicep strength', 'Improves posture']
            },
            {
              name: 'Shoulder Press',
              sets: '3',
              reps: '10-12',
              difficulty: 'intermediate',
              equipment: ['Dumbbells'],
              benefits: ['Shoulder strength', 'Functional movement']
            }
          ]
        },
        {
          day: 'Tuesday & Friday',
          focus: 'Lower Body & Core',
          exercises: [
            {
              name: 'Squats',
              sets: '3-4',
              reps: '12-20',
              difficulty: 'intermediate',
              equipment: ['None or weights'],
              benefits: ['Leg strength', 'Functional movement', 'Core engagement']
            },
            {
              name: 'Deadlifts',
              sets: '3',
              reps: '8-12',
              difficulty: 'intermediate',
              equipment: ['Dumbbells or barbell'],
              benefits: ['Full body strength', 'Posterior chain development']
            },
            {
              name: 'Planks',
              duration: '30-60 seconds',
              sets: '3',
              difficulty: 'intermediate',
              equipment: ['None'],
              benefits: ['Core strength', 'Stability', 'Posture improvement']
            }
          ]
        },
        {
          day: 'Wednesday & Saturday',
          focus: 'Cardio & Flexibility',
          exercises: [
            {
              name: 'HIIT Training',
              duration: '20-25 minutes',
              difficulty: 'advanced',
              equipment: ['None'],
              benefits: ['Cardiovascular fitness', 'Fat burning', 'Time efficient']
            },
            {
              name: 'Yoga Flow',
              duration: '15-20 minutes',
              difficulty: 'beginner',
              equipment: ['Yoga mat'],
              benefits: ['Flexibility', 'Stress relief', 'Balance improvement']
            }
          ]
        }
      ],
      tips: [
        'Progressive overload - gradually increase weights/reps',
        'Focus on proper form over heavy weights',
        'Get adequate rest between workout days',
        'Track your progress to stay motivated'
      ]
    }
  };

  const generateWorkout = () => {
    const plan = workoutPlans[selectedCondition];
    if (plan) {
      setCurrentPlan(plan);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Personalized Workout Plans</h2>
        <p className="text-gray-600">Get customized exercise routines based on your health condition and fitness level</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Fitness Assessment
          </CardTitle>
          <CardDescription>Tell us about your health and fitness preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Health Condition</label>
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
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
              <label className="text-sm font-medium">Fitness Level</label>
              <Select value={fitnessLevel} onValueChange={setFitnessLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {fitnessLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Available</label>
              <Select value={timeAvailable} onValueChange={setTimeAvailable}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time.value} value={time.value}>
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={generateWorkout}
            disabled={!selectedCondition || !fitnessLevel || !timeAvailable}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Dumbbell className="w-4 h-4 mr-2" />
            Generate My Workout Plan
          </Button>
        </CardContent>
      </Card>

      {currentPlan && (
        <div className="space-y-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Zap className="w-5 h-5" />
                {currentPlan.name}
              </CardTitle>
              <CardDescription className="text-blue-700">
                {currentPlan.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Duration:</span>
                    <span>{currentPlan.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Frequency:</span>
                    <span>{currentPlan.frequency}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Benefits</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Improves cardiovascular health</li>
                    <li>• Builds functional strength</li>
                    <li>• Enhances overall fitness</li>
                    <li>• Supports your health condition</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="workouts" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="workouts">Workout Schedule</TabsTrigger>
              <TabsTrigger value="tips">Tips & Guidelines</TabsTrigger>
            </TabsList>
            
            <TabsContent value="workouts" className="space-y-4">
              {currentPlan.days.map((day, dayIndex) => (
                <Card key={dayIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PlayCircle className="w-5 h-5 text-blue-600" />
                      {day.day}
                    </CardTitle>
                    <CardDescription>Focus: {day.focus}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {day.exercises.map((exercise, exerciseIndex) => (
                        <div key={exerciseIndex} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-lg">{exercise.name}</h4>
                            <Badge className={getDifficultyColor(exercise.difficulty)}>
                              {exercise.difficulty}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              {exercise.duration && (
                                <p className="text-sm"><span className="font-medium">Duration:</span> {exercise.duration}</p>
                              )}
                              {exercise.sets && (
                                <p className="text-sm"><span className="font-medium">Sets:</span> {exercise.sets}</p>
                              )}
                              {exercise.reps && (
                                <p className="text-sm"><span className="font-medium">Reps:</span> {exercise.reps}</p>
                              )}
                              <div className="flex flex-wrap gap-1">
                                <span className="text-sm font-medium">Equipment:</span>
                                {exercise.equipment.map((eq, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {eq}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="font-medium text-sm mb-1">Benefits:</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {exercise.benefits.map((benefit, index) => (
                                  <li key={index} className="flex items-start gap-1">
                                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="tips">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Important Guidelines</CardTitle>
                  <CardDescription>
                    Follow these tips to maximize your workout effectiveness and safety
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {currentPlan.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-1">Safety Reminder</h4>
                  <p className="text-sm text-yellow-800">
                    Always consult with your healthcare provider before starting any new exercise program, 
                    especially if you have pre-existing health conditions. Listen to your body and stop 
                    if you experience any pain or discomfort.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanner;
