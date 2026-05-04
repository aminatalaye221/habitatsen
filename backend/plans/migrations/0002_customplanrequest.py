from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plans', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomPlanRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('phone', models.CharField(max_length=30)),
                ('terrain_size', models.CharField(max_length=100)),
                ('rooms', models.PositiveIntegerField()),
                ('style', models.CharField(choices=[('moderne', 'Moderne'), ('traditionnel', 'Traditionnel'), ('mixte', 'Mixte')], default='moderne', max_length=20)),
                ('budget', models.CharField(max_length=100)),
                ('comment', models.TextField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
