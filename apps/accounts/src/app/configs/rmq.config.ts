import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRMQServiceAsyncOptions } from 'nestjs-rmq';

// Функция для получения конфигурации RMQ
export const getRMQConfig = (): IRMQServiceAsyncOptions => ({
  // Зависимости, которые будут инжектироваться
  inject: [ConfigService],
  // Модули, которые будут импортироваться
  imports: [ConfigModule],
  // Фабричная функция для создания конфигурации
  useFactory: (configService: ConfigService) => ({
    // Имя обмена, получаемое из конфигурации
    exchangeName: configService.get('AMQP_EXCHANGE') ?? '',
    // Настройки соединений
    connections: [
      {
        // Логин для подключения
        login: configService.get('AMQP_USER') ?? '',
        // Пароль для подключения
        password: configService.get('AMQP_PASSWORD') ?? '',
        // Хост для подключения
        host: configService.get('AMQP_HOSTNAME') ?? '',
      },
    ],
    // Имя очереди, получаемое из конфигурации
    queueName: configService.get('AMQP_QUEUE') ?? '',
    // Указывает, что очередь устойчивая
    durable: true,
    // Указывает, что сообщения должны быть подтверждены вручную
    noAck: true,
    // Количество сообщений, которые могут быть обработаны одновременно
    prefetchCount: 32,
    // Имя сервиса
    serviceName: 'account',
/*     bindings: [
      {
        routingKey: 'account.*',
      },
    ], */
  }),
});
