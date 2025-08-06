<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Datas extends Model
{
    use HasFactory;

    protected $table = 'datas';

    protected $fillable = [
        'user_id',
        'loc_id',
        'is_trash',
        'file_path'
    ];

    public $timestamps = false;

    // Relasi dengan model Location
    public function location()
    {
        return $this->belongsTo(Location::class, 'loc_id');
    }

    // Relasi dengan model User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
