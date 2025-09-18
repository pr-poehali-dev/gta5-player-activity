import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface User {
  id: string;
  username: string;
  level: number;
  status: 'online' | 'afk' | 'offline';
  avatar?: string;
  stats: {
    totalOnlineTime: number;
    sessionsCount: number;
    lastSeen: Date;
  };
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('main');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registrationEnabled, setRegistrationEnabled] = useState(true);

  // Mock data
  const [allUsers, setAllUsers] = useState<User[]>([
    {
      id: '1',
      username: 'AdminPro',
      level: 10,
      status: 'online',
      avatar: '/placeholder.svg',
      stats: { totalOnlineTime: 48563, sessionsCount: 234, lastSeen: new Date() }
    },
    {
      id: '2', 
      username: 'Player007',
      level: 7,
      status: 'online',
      stats: { totalOnlineTime: 25420, sessionsCount: 145, lastSeen: new Date() }
    },
    {
      id: '3',
      username: 'NoviceGamer',
      level: 3,
      status: 'afk',
      stats: { totalOnlineTime: 5200, sessionsCount: 28, lastSeen: new Date(Date.now() - 900000) }
    },
    {
      id: '4',
      username: 'ElitePlayer',
      level: 9,
      status: 'offline',
      stats: { totalOnlineTime: 38900, sessionsCount: 189, lastSeen: new Date(Date.now() - 7200000) }
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    const user = allUsers.find(u => u.username.toLowerCase() === loginData.username.toLowerCase());
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      toast.success('Добро пожаловать в систему!');
    } else {
      toast.error('Неверные учетные данные');
    }
  };

  const changeUserStatus = (status: 'online' | 'afk' | 'offline') => {
    if (currentUser) {
      const updatedUser = { ...currentUser, status };
      setCurrentUser(updatedUser);
      setAllUsers(users => 
        users.map(u => u.id === currentUser.id ? updatedUser : u)
      );
      toast.success(`Статус изменен на ${status === 'online' ? 'Онлайн' : status === 'afk' ? 'AFK' : 'Оффлайн'}`);
    }
  };

  const formatOnlineTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return `${days}д ${hours % 24}ч`;
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'afk': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#221F26] to-[#1A1F2C] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#2a2535]/90 backdrop-blur-xl border-[#9b87f5]/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-[#9b87f5] to-[#D946EF] bg-clip-text text-transparent">
              GTA 5 Activity Tracker
            </CardTitle>
            <p className="text-center text-gray-400">Войдите в систему учета активности</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">Имя пользователя</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  className="bg-[#1A1F2C] border-[#9b87f5]/30 text-white focus:border-[#9b87f5]"
                  placeholder="Введите ваш никнейм"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="bg-[#1A1F2C] border-[#9b87f5]/30 text-white focus:border-[#9b87f5]"
                  placeholder="Введите пароль"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-[#9b87f5] to-[#D946EF] hover:opacity-90 transition-opacity">
                <Icon name="LogIn" className="mr-2" size={18} />
                Войти в систему
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#221F26] to-[#1A1F2C]">
      {/* Navigation */}
      <nav className="bg-[#2a2535]/50 backdrop-blur-xl border-b border-[#9b87f5]/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#D946EF] bg-clip-text text-transparent">
                GTA 5 Tracker
              </h1>
              <div className="hidden md:flex space-x-1">
                {['main', 'profile', 'statistics', 'players', 'settings', 'admin'].map((tab) => {
                  const canAccess = tab === 'admin' ? currentUser?.level === 10 : 
                                   (tab === 'players' || tab === 'statistics') ? currentUser!.level >= 5 : true;
                  if (!canAccess) return null;
                  
                  return (
                    <Button
                      key={tab}
                      variant="ghost"
                      onClick={() => setActiveTab(tab)}
                      className={`text-gray-300 hover:text-white hover:bg-[#9b87f5]/20 ${activeTab === tab ? 'bg-[#9b87f5]/20 text-white' : ''}`}
                    >
                      <Icon name={
                        tab === 'main' ? 'Home' :
                        tab === 'profile' ? 'User' :
                        tab === 'statistics' ? 'BarChart3' :
                        tab === 'players' ? 'Users' :
                        tab === 'settings' ? 'Settings' :
                        'Shield'
                      } size={18} className="mr-2" />
                      {tab === 'main' ? 'Главная' :
                       tab === 'profile' ? 'Профиль' :
                       tab === 'statistics' ? 'Статистика' :
                       tab === 'players' ? 'Игроки' :
                       tab === 'settings' ? 'Настройки' :
                       'Администрирование'}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={`${getStatusColor(currentUser!.status)} text-white`}>
                {currentUser?.status === 'online' ? 'Онлайн' : 
                 currentUser?.status === 'afk' ? 'AFK' : 'Оффлайн'}
              </Badge>
              <Button variant="ghost" onClick={() => {setIsAuthenticated(false); toast.success('Вы вышли из системы');}}>
                <Icon name="LogOut" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Main Dashboard */}
        {activeTab === 'main' && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-[#2a2535]/50 backdrop-blur border-[#9b87f5]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Всего игроков</CardTitle>
                <Icon name="Users" className="text-[#9b87f5]" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{allUsers.length}</div>
                <p className="text-xs text-gray-400">+2 за последний час</p>
              </CardContent>
            </Card>

            <Card className="bg-[#2a2535]/50 backdrop-blur border-[#9b87f5]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Онлайн сейчас</CardTitle>
                <Icon name="Activity" className="text-green-500" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {allUsers.filter(u => u.status === 'online').length}
                </div>
                <Progress 
                  value={(allUsers.filter(u => u.status === 'online').length / allUsers.length) * 100} 
                  className="h-2 mt-2 bg-gray-700"
                />
              </CardContent>
            </Card>

            <Card className="bg-[#2a2535]/50 backdrop-blur border-[#9b87f5]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">AFK игроков</CardTitle>
                <Icon name="Coffee" className="text-yellow-500" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {allUsers.filter(u => u.status === 'afk').length}
                </div>
                <p className="text-xs text-gray-400">Отошли от игры</p>
              </CardContent>
            </Card>

            <Card className="bg-[#2a2535]/50 backdrop-blur border-[#9b87f5]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Средний уровень</CardTitle>
                <Icon name="TrendingUp" className="text-[#D946EF]" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {(allUsers.reduce((sum, u) => sum + u.level, 0) / allUsers.length).toFixed(1)}
                </div>
                <p className="text-xs text-gray-400">По всем игрокам</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Profile */}
        {activeTab === 'profile' && currentUser && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="bg-[#2a2535]/50 backdrop-blur border-[#9b87f5]/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Мой профиль</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-[#9b87f5] to-[#D946EF] text-white text-2xl">
                      {currentUser.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{currentUser.username}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="border-[#9b87f5] text-[#9b87f5]">
                        Уровень {currentUser.level}
                      </Badge>
                      <Badge className={`${getStatusColor(currentUser.status)} text-white`}>
                        {currentUser.status === 'online' ? 'Онлайн' : 
                         currentUser.status === 'afk' ? 'AFK' : 'Оффлайн'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">Изменить статус</h4>
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => changeUserStatus('online')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Icon name="Circle" size={16} className="mr-2" />
                      Онлайн
                    </Button>
                    <Button 
                      onClick={() => changeUserStatus('afk')}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white"
                    >
                      <Icon name="Coffee" size={16} className="mr-2" />
                      AFK
                    </Button>
                    <Button 
                      onClick={() => changeUserStatus('offline')}
                      className="bg-gray-600 hover:bg-gray-700 text-white"
                    >
                      <Icon name="CircleOff" size={16} className="mr-2" />
                      Оффлайн
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3 pt-4">
                  <div className="bg-[#1A1F2C] rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Общее время онлайн</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {formatOnlineTime(currentUser.stats.totalOnlineTime)}
                    </p>
                  </div>
                  <div className="bg-[#1A1F2C] rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Количество сессий</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {currentUser.stats.sessionsCount}
                    </p>
                  </div>
                  <div className="bg-[#1A1F2C] rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Последний вход</p>
                    <p className="text-xl font-bold text-white mt-1">
                      {new Date(currentUser.stats.lastSeen).toLocaleTimeString('ru-RU')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Statistics */}
        {activeTab === 'statistics' && currentUser!.level >= 5 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Статистика сервера</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-[#2a2535]/50 backdrop-blur border-[#9b87f5]/20">
                <CardHeader>
                  <CardTitle className="text-white">Активность за неделю</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'].map((day, index) => (
                      <div key={day} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">{day}</span>
                          <span className="text-white font-medium">{Math.floor(Math.random() * 50 + 30)} игроков</span>
                        </div>
                        <Progress 
                          value={Math.random() * 100} 
                          className="h-2 bg-gray-700"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2a2535]/50 backdrop-blur border-[#9b87f5]/20">
                <CardHeader>
                  <CardTitle className="text-white">Топ игроков по времени</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {allUsers.sort((a, b) => b.stats.totalOnlineTime - a.stats.totalOnlineTime).map((user, index) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                            ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-[#1A1F2C]'}`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-white font-medium">{user.username}</p>
                            <p className="text-gray-400 text-sm">Уровень {user.level}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{formatOnlineTime(user.stats.totalOnlineTime)}</p>
                          <Badge className={`${getStatusColor(user.status)} text-white text-xs`}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Players */}
        {activeTab === 'players' && currentUser!.level >= 5 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white">Все игроки</h2>
              <Input 
                placeholder="Поиск игрока..." 
                className="max-w-sm bg-[#2a2535]/50 border-[#9b87f5]/30 text-white"
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {allUsers.map(user => (
                <Card key={user.id} className="bg-[#2a2535]/50 backdrop-blur border-[#9b87f5]/20 hover:border-[#9b87f5]/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-[#9b87f5] to-[#D946EF] text-white">
                          {user.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{user.username}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="border-[#9b87f5] text-[#9b87f5] text-xs">
                            LVL {user.level}
                          </Badge>
                          <Badge className={`${getStatusColor(user.status)} text-white text-xs`}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Время онлайн</p>
                        <p className="text-white font-medium">{formatOnlineTime(user.stats.totalOnlineTime)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Сессий</p>
                        <p className="text-white font-medium">{user.stats.sessionsCount}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Настройки</h2>
            
            <Card className="bg-[#2a2535]/50 backdrop-blur border-[#9b87f5]/20">
              <CardHeader>
                <CardTitle className="text-white">Основные настройки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Отображаемое имя</Label>
                  <Input 
                    value={currentUser?.username} 
                    className="bg-[#1A1F2C] border-[#9b87f5]/30 text-white"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Email уведомления</Label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com"
                    className="bg-[#1A1F2C] border-[#9b87f5]/30 text-white"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Звуковые уведомления</Label>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Admin */}
        {activeTab === 'admin' && currentUser?.level === 10 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Панель администратора</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-[#2a2535]/50 backdrop-blur border-[#9b87f5]/20">
                <CardHeader>
                  <CardTitle className="text-white">Управление регистрацией</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Регистрация новых пользователей</p>
                      <p className="text-gray-400 text-sm">Разрешить создание новых аккаунтов</p>
                    </div>
                    <Switch 
                      checked={registrationEnabled}
                      onCheckedChange={setRegistrationEnabled}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2a2535]/50 backdrop-blur border-[#9b87f5]/20">
                <CardHeader>
                  <CardTitle className="text-white">Создать пользователя</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input 
                    placeholder="Имя пользователя" 
                    className="bg-[#1A1F2C] border-[#9b87f5]/30 text-white"
                  />
                  <Input 
                    placeholder="Уровень (1-10)" 
                    type="number" 
                    min="1" 
                    max="10"
                    className="bg-[#1A1F2C] border-[#9b87f5]/30 text-white"
                  />
                  <Button className="w-full bg-gradient-to-r from-[#9b87f5] to-[#D946EF] hover:opacity-90">
                    <Icon name="UserPlus" size={18} className="mr-2" />
                    Создать пользователя
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;